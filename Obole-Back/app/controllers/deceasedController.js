const dataMapper = require('../dataMapper');
const sendMail= require('../email/send-email');
const deceasedController = {

    enterDeceased: async (req,res) => {
        try{

            // 1. décortiquer le req.body comprenant les 3 sous-objets en trois parties : deceasedInfo, conservationInfo et deceasedRefInfo
            const deceasedInfo = req.body.deceased;

                // 1.2 isoler req.body.deceased.room
            const roomName = req.body.deceased.room;
            
                // 1.3 appeler datamapper pour avoir l'id de la room d'après son nom
            const roomId = await dataMapper.getRoomByName(roomName);
            // console.log(roomId);

                // 1.4 rajouter l'id à l'objet deceasedInfo
            deceasedInfo.roomId = roomId.id;

            const conservationInfo = req.body.conservation;
            const deceasedRefInfo = req.body.deceased_ref;

            // 1bis vérifier que le défunt n'existe pas déjà 
                // 1bis.1 faire la méthode datamapper avec un select sur le deceased
                // 1bis.2 faire appel à la méthode en lui passant deceasedInfo
            const existingDeceased = await dataMapper.getOneDeceasedWithoutId(deceasedInfo);
                // 1bis.3 vérifier si le défunt existe déjà et si oui renvoyer un message
            if (existingDeceased) {
                res.send(`Ce défunt est déjà enregistré`);
            } else {
                // 2. faire l'insertion du deceased
                    // 2.1 faire la méthode dans le datamapper en renvoyant le deceased
                    // 2.2 faire appel à cette méthode en lui passant deceasedInfo
                const newDeceased = await dataMapper.enterDeceased(deceasedInfo);

                // 3. incrémenter la room occupation - voir ci-dessous méthode de Reuben
                const roomInsertion = await dataMapper.incrementRoomCapacity(deceasedInfo.roomId);

                // 4. faire l'insertion du conservation s'il y en a un
                    // 4.1 faire la méthode datamapper 
                    // 4.2 vérifier la présence de valeurs dans conservationInfo (tous les champs pour un soin de cons sont obligatoires)
                        // 4.2.1 faire un tableau vide
                    let conservationInfoValues = [];
                    
                        // 4.2.2 boucler sur les valeurs de conservationInfo (Object.values)
                            // 4.2.2.1 pour chaque valeur, s'il y a présence de valeur, on la push dans le tableau vide (sinon on ne fait rien)
                    for (let value of Object.values(conservationInfo)) {
                        if (value) {
                            conservationInfoValues.push(value);
                        }
                    }

                        // 4.2.3 on vérifie la longueur du nouveau tableau , si oui faire : (sinon ne rien faire)
                    if (conservationInfoValues.length) {
                        // 4.2.3.1 appeler la méthode pour ajouter un conservation en lui passant l'id du nouveau défunt et conservationInfo
                        await dataMapper.addConservation(newDeceased.id, conservationInfo);
                    }

                // 5. faire l'insertion du deceased_ref s'il y en a un
                    // 5.1 faire la méthode datamapper en renvoyant le deceased_ref
                    // 5.2 vérifier la présence de valeurs dans deceasedRefInfo (tous les champs ne sont pas obligatoires)
                        // 5.2.1 faire un tableau vide
                        let deceasedRefInfosValues = [];
                        // 5.2.2 boucler sur les valeurs de deceasedRefInfo (Object.values)
                            // 5.2.2.1 pour chaque valeur, s'il y a présence de valeur, on la push dans le tableau vide (sinon on ne fait rien)
                        for (let value of Object.values(deceasedRefInfo)) {
                            if (value) {
                                deceasedRefInfosValues.push(value);
                            }
                        }
                        // 5.2.3 on vérifie la longueur du nouveau tableau , si oui faire : (sinon ne rien faire)
                        if (deceasedRefInfosValues.length) {
                            // 5.2.3.1 appeler la méthode pour ajouter un deceased_ref en lui passant deceasedRefInfo 
                            const newDeceasedRef = await dataMapper.addDeceasedRef(deceasedRefInfo);
                            // 5.2.3.2 faire un update sur deceased pour le champ deceased_ref_id
                                // 5.2.3.2.1 faire la méthode dans le datamapper
                                // 5.2.3.2.2 appeler cette méthode
                            await dataMapper.updateDeceasedOnDeceasedRefId(newDeceased.id, newDeceasedRef.id);
                        }

                // 6. envoyer l'email aux admins si on atteint la capacité max de la chambre - voir ci-dessous méthode de Reuben

                //console.log(insertion);
                const admins=await dataMapper.getAdmins();
                // console.log(admins);

                const room = await dataMapper.seeRoom(roomInsertion.id);
                // console.log(room);
                // console.log(room.occupation);
                // console.log(room.capacity);
                if(room.occupation === room.capacity) {
                    console.log('yes');
                    sendMail(admins,room.name)
                }

                // console.log(newDeceased);
                // 7. renvoyer les infos nécessaires au front (infos du nouveau défunt ou juste un message du style ok ?)
                        // 7.1 appeler la méthode pour un défunt en lui passant le nouvel id
                const newDeceasedAllInfos = await dataMapper.getOneDeceased(newDeceased.id);
                        // 7.2 renvoyer les données
                // console.log(newDeceasedAllInfos);
                res.send(newDeceasedAllInfos);
            }
            
        } catch(err) {
            console.trace(err);
            res.status(500).send(err);
        }
       
    },

    removeDeceased: async (req,res) => {
        try{
            const getDeceased=await dataMapper.removeDeceased(req.params.id);
            
            
            if(getDeceased){
                await dataMapper.decrementRoomCapacity(getDeceased[0]);
                 console.log(getDeceased[1]);
                res.json(getDeceased[1]);
            }

            else{
                res.json({message:'le defunt a deja eté énlevé'});
            }
            
            
        }
        catch(error){
            res.json(error.message);
        }
    },

    allPresentDeceased: async (req, res) => {
        try {

            const presentsDeceased = await dataMapper.getAllPresentDeceased();

            res.send(presentsDeceased);

        } catch(err){
            console.trace(err);
            res.status(500).send(err);
        }
    },

    allDeceased: async (req, res) => {
        try {

            const allDeceased = await dataMapper.getAllDeceased();

            res.send(allDeceased);

        } catch(err){
            console.trace(err);
            res.status(500).send(err);
        }
    },

    oneDeceased: async (req, res) => {
        try {

            const deceasedId = req.params.id;

            const oneDeceased = await dataMapper.getOneDeceased(deceasedId);

            res.send(oneDeceased);

        } catch(err){
            console.trace(err);
            res.status(500).send(err);
        }
    },

    updateDeceased: async (req, res) => {
        try {

            // 1. décortiquer le req.body (contient 3 sou-objets : deceasedInfo, conservationInfo et deceasedRefInfo)

            // 

        } catch(err){
            console.trace(err);
            res.status(500).send(err);
        }
    },

    addConservation: async (req, res) => {
        try {
            if (!req.body.date || !req.body.embalmer) {
                return res.send('Veuillez remplir tous les champs');
            }

            const deceasedId = req.params.id;

            await dataMapper.addConservation(deceasedId, req.body);

            res.send('OK'); // --> à rectifier une fois la route pour la fiche défunt mise en place, voir ci-dessous

            // res.redirect('/deceased/:id') --> prévoir de rectifier la bonne route pour la redirection sur la route pour la fiche du défunt avec le nouveau soin de conservation !!

        } catch(err){
            console.trace(err);
            res.status(500).send(err);
        }
    },

    updateConservation: async (req, res) => {
        try {

            const deceasedId = req.params.id;
            const updatedConservation = await dataMapper.updateConservation(deceasedId, req.body);

            // res.redirect('route pour un défunt');

        } catch(err){
            console.trace(err);
            res.status(500).send(err);
        }
    },
};

module.exports = deceasedController;