const dataMapper = require('../dataMapper');
const sendMail=require('../email/send-email');
const deceasedController={
    enterDeceased:async(req,res)=>{
        try{

            // 1. décortiquer le req.body comprenant les 3 sous-objets en trois parties : deceasedInfo, conservationInfo et deceasedRefInfo

            const deceasedInfo = req.body.deceased;

                // 1.2 isoler req.body.deceased.room
                // 1.3 appeler datamapper pour avoir l'id de la room d'après son nom
                // 1.4 rajouter l'id à l'objet deceasedInfo 

            const conservationInfo = req.body.conservation;
            const deceasedRefInfo = req.body.deceased_ref;

            // 2. faire l'insertion du deceased
                // 2.1 faire la méthode dans le datamapper en renvoyant le deceased
                // 2.2 faire appel à cette méthode en lui passant deceasedInfo

            // 3. incrémenter la room occupation - voir ci-dessous méthode de Reuben

            // 4. faire l'insertion du conservation s'il y en a un
                // 4.1 faire la méthode datamapper 
                // 4.2 appeler cette méthode en lui passant conservationInfo

            // 5. faire l'insertion du deceased_ref s'il y en a un
                // 5.1 faire la méthode datamapper en renvoyant le deceased_ref
                // 5.2 appeler cette méthode en lui passant deceasedRefInfo
                // 5.3 faire un update sur deceased pour le champ deceased_ref_id

            // 6. appeler la méthode getOneDeceased avec le nouvel id

            // 7. envoyer l'email aux admins si on atteint la capacité max de la chambre - voir ci-dessous méthode de Reuben

            const insertion= await dataMapper.enterDeceased(req.body);

           
            //console.log(insertion);
            const admins=await dataMapper.getAdmins();
            // console.log(admins);

            
            await dataMapper.incrementRoomCapacity(insertion.room_id);

            const room=await dataMapper.seeRoom(insertion.room_id);
            console.log(room);
             console.log(room.occupation);
             console.log(room.capacity);
                if(room.occupation==room.capacity){
                    console.log('yes');
                    sendMail(admins,room.name)
                }
            

          

        
            res.json(insertion);

            
            
        }
        catch(error){
            return error.message;
        }
       
    },
    removeDeceased:async(req,res)=>{
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

            const deceasedId = req.params.id;
            const updatedDeceased = await dataMapper.updateDeceased(deceasedId, req.body);

            res.send(updatedDeceased);

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
}



module.exports=deceasedController;