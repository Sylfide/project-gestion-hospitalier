const dataMapper = require('../dataMapper');
const sendMail= require('../email/send-email');
const moment = require('moment');

const deceasedController = {

    enterDeceased: async (req,res) => {
        try{

            // 1. décortiquer le req.body comprenant les 3 sous-objets en trois parties : deceasedInfo, conservationInfo et deceasedRefInfo
            const deceasedInfo = req.body.deceased;
            // console.log('infos avant traitement : ', deceasedInfo);

            const deceasedDates = {
                birth_date: deceasedInfo.birth_date, 
                deceased_date: deceasedInfo.deceased_date, 
                entry_date: deceasedInfo.entry_date, 
                exit_date: deceasedInfo.exit_date, 
                burial_permit_date: deceasedInfo.burial_permit_date
            };

            // boucle sur le précédent objet pour formater chaque date et remplacer les dates d'un défunt par les dates du nouvel objet pour avoir les bons formats de date 
            for (let date in deceasedDates) {
                if (deceasedDates[date] !== null) {
                    // console.log(dates[date]);
                    deceasedDates[date] = moment(deceasedDates[date], "DD/MM/YYYY").format("YYYY-MM-DD");
                    // console.log('dates : ' + dates[date]);
                    // console.log('oneDeceased : ' + oneDeceased[date]);
                    deceasedInfo[date] = deceasedDates[date];
                } 
            }

            // console.log('infos après traitement : ', deceasedInfo);

                // 1.2 isoler req.body.deceased.room
            const roomName = req.body.deceased.room;
            
                // 1.3 appeler datamapper pour avoir l'id de la room d'après son nom
            const roomId = await dataMapper.getRoomByName(roomName);
            // console.log(roomId);

                // 1.4 rajouter l'id à l'objet deceasedInfo
            deceasedInfo.roomId = roomId.id;

            const conservationInfo = req.body.conservation;
            // console.log('infos conservation avant traitement : ', conservationInfo);
            if(conservationInfo.date !== null) {
                // console.log(conservationInfo.date);
                conservationInfo.date = moment(conservationInfo.date, "DD/MM/YYYY").format("YYYY-MM-DD");
            }
            // console.log(conservationInfo);

            const deceasedRefInfo = req.body.deceased_ref;

            // 1bis vérifier que le défunt n'existe pas déjà 
                // 1bis.1 faire la méthode datamapper avec un select sur le deceased
                // 1bis.2 faire appel à la méthode en lui passant deceasedInfo
            const existingDeceased = await dataMapper.getOneDeceasedWithoutId(deceasedInfo);
                // 1bis.3 vérifier si le défunt existe déjà et si oui renvoyer un message
            if (existingDeceased) {
                res.status(401).send(`Ce défunt est déjà enregistré`);
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
                    // console.log('yes');
                    sendMail(admins,room.name)
                }

                // console.log(newDeceased);
                // 7. renvoyer les infos nécessaires au front (infos du nouveau défunt ou juste un message du style ok ?)
                        // 7.1 appeler la méthode pour un défunt en lui passant le nouvel id

                const allDeceased = await dataMapper.getAllPresentDeceased();

                res.send(allDeceased);
            }
            
        } catch(err) {
            console.trace(err);
            res.status(500).send(err);
        }
       
    },

    removeDeceased: async (req,res) => {
        try{
            const getDeceased=await dataMapper.removeDeceased(req.params.id,req.body.exit_date);
            
            
            if(getDeceased){
                await dataMapper.decrementRoomCapacity(getDeceased[0]);
                // console.log(getDeceased[1]);
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

            // console.log("avant traitement : ", presentsDeceased);

            // for (let deceased of presentsDeceased) {
            //     deceased.birth_date = moment(deceased.birth_date).format("DD/MM/YYYY");
            //     deceased.entry_date = moment(deceased.entry_date).format("DD/MM/YYYY");
            // }

            // console.log("après traitement : ", presentsDeceased);

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

            // console.log(oneDeceased);

            // construction d'un objet pour isoler les dates 
            const dates = {
                birth_date: oneDeceased.birth_date, 
                deceased_date: oneDeceased.deceased_date, 
                entry_date: oneDeceased.entry_date, 
                exit_date: oneDeceased.exit_date, 
                burial_permit_date: oneDeceased.burial_permit_date, 
                conservation_date: oneDeceased.conservation_date
            };

            // console.log(dates);

            // boucle sur le précédent objet pour formater chaque date et remplacer les dates d'un défunt par les dates du nouvel objet pour avoir les bons formats de date 
            for (let date in dates) {
                if (dates[date] !== null) {
                    // console.log(dates[date]);
                    dates[date] = moment(dates[date], "DD/MM/YYYY").format("DD/MM/YYYY");
                    // console.log('dates : ' + dates[date]);
                    // console.log('oneDeceased : ' + oneDeceased[date]);
                    oneDeceased[date] = dates[date];
                } 
            }

            // console.log(dates);
            // console.log(oneDeceased);

            res.send(oneDeceased);

        } catch(err){
            console.trace(err);
            res.status(500).send(err);
        }
    },

    updateDeceased: async (req, res) => {
        try {

            // 1. décortiquer le req.body (contient 3 sous-objets : deceasedInfo, conservationInfo et deceasedRefInfo)
                // 1.1 isoler deceasedInfo
            const deceasedInfo = req.body.deceased;

            const deceasedDates = {
                birth_date: deceasedInfo.birth_date, 
                deceased_date: deceasedInfo.deceased_date, 
                entry_date: deceasedInfo.entry_date, 
                exit_date: deceasedInfo.exit_date, 
                burial_permit_date: deceasedInfo.burial_permit_date
            };

            // boucle sur le précédent objet pour formater chaque date et remplacer les dates d'un défunt par les dates du nouvel objet pour avoir les bons formats de date 
            for (let date in deceasedDates) {
                if (deceasedDates[date] !== null) {
                    // console.log(dates[date]);
                    deceasedDates[date] = moment(deceasedDates[date], "DD/MM/YYYY").format("YYYY-MM-DD");
                    // console.log('dates : ' + dates[date]);
                    // console.log('oneDeceased : ' + oneDeceased[date]);
                    deceasedInfo[date] = deceasedDates[date];
                } 
            }

                // 1.2 isoler req.body.deceased.room
            const roomName = req.body.deceased.room;
                // 1.3 appeler datamapper pour avoir l'id de la room d'après son nom
            const roomId = await dataMapper.getRoomByName(roomName);
                // 1.4 rajouter l'id à l'objet deceasedInfo
            deceasedInfo.room_id = roomId.id;
                // 1.5 isoler conservationInfo et deceasedRefInfo
            const conservationInfo = req.body.conservation;

            if(conservationInfo.date !== null) {
                // console.log(conservationInfo.date);
                conservationInfo.date = moment(conservationInfo.date, "DD/MM/YYYY").format("YYYY-MM-DD");
            }

            const deceasedRefInfo = req.body.deceased_ref;

            // 2. vérifier si changement de chambre, si oui décrémenter l'ancienne et incrémenter la nouvelle et envoyer le mail sinon capacité max atteinte (sinon ne rien faire)
                // 2.1 appeler datamapper pour voir le détail du deceased AVANT l'update
            const deceasedId = req.params.id;
            const currentDeceased = await dataMapper.getOneDeceased(deceasedId);
                // 2.2 comparer deceasedInfo.roomId et currentDeceased.room_id et si différents -> 
            if (deceasedInfo.room_id !== currentDeceased.room_id) {
                    // 2.2.1 décrémenter l'ancienne room
                        // appeler la méthode en lui passant currentDeceased.room_id
                    await dataMapper.decrementRoomCapacity(currentDeceased.room_id);
                    // 2.2.2 incrémenter la nouvelle : appeler datamapper incrementRoomCapacity en lui passant deceasedInfo.roomId
                    const roomInsertion = await dataMapper.incrementRoomCapacity(deceasedInfo.room_id);
                    // 2.2.3 si la capacité max de la nouvelle room est atteinte envoyer le mail aux admins (reprendre la méthode de Reuben)
                    const admins = await dataMapper.getAdmins();
                    const room = await dataMapper.seeRoom(roomInsertion.id);
                    if (room.occupation === room.capacity) {
                        // console.log('yes');
                        sendMail(admins, room.name);
                    }
            }

            // 3. faire l'update du deceased
            if (deceasedInfo.exit_date !== null) { 
                
                // 3.1 si le deceasedInfo.exit_date !== null
                    // 3.1.1 appeler datamapper removeDeceased en lui passant deceasedId
                await dataMapper.removeDeceased(deceasedId);
                    // 3.1.1bis appeler datamapper pour décrémenter la chambre
                await dataMapper.decrementRoomCapacity(deceasedInfo.room_id);
                    // 3.1.2 appeler datamapper updateDeceased
                await dataMapper.updateDeceased(deceasedId, deceasedInfo);
            } else {
                // 3.2 sinon 
                    // 3.2.1 faire la méthode dans datamapper en renvoyant le deceased
                    // 3.2.2 faire appel à la méthode en lui passant deceasedInfo (elle renvoie TOUTES les infos sur le défunt)
                await dataMapper.updateDeceased(deceasedId, deceasedInfo);
            }

            // 4. faire l'update du conservation s'il y a de nouvelles données
                // d'un côté, j'ai conservationInfo (date, embalmer_id) et de l'autre j'ai currentDeceased qui contient conservation_id, conservation_date, embalmer_id, embalmer_lastame et embalmer_firstname
                // plusieurs cas possibles : 
                    // - pas de conservation dans currentDeceased (id = null) et pas de données dans conservationInfo --> le soin n'existe pas en bdd, donc ne rien faire 
                    // - un conservation dans currentDeceased et pas de données dans conservationInfo --> delete
                    // - pas de conservation dans currentDeceased et des nouvelles données dans conservationInfo --> add
                    // - un conservation dans currentDeceased et des nouvelles données dans conservationInfo --> update

                // d'abord, je contruis le tableau des éventuelles valeurs pour pouvoir conditionner dessus ensuite
            let conservationInfoValues = [];

            for (let value of Object.values(conservationInfo)) {
                if (value) {
                    conservationInfoValues.push(value);
                }
            }
            
            // 4.1 si currentDeceased.conservation_id === null && conservationInfo contient des données, appeler datamapper pour ajouter le soin en lui passant updatedDeceased.id et conservationInfo
            if (currentDeceased.conservation_id === null && conservationInfoValues.length) {
                await dataMapper.addConservation(currentDeceased.id, conservationInfo);
            } else if (currentDeceased.conservation_id !== null && conservationInfoValues.length) {
                // 4.2 sinon si currentDeceased.conservation_id !== null && conservationInfo contient des données : 
                    // 4.2.1 faire la méthode datamapper updateConservation
                    // 4.2.2 appeler datamapper pour update le soin en lui passant conservationInfo et le currentDeceased.id
                await dataMapper.updateConservation(currentDeceased.id, conservationInfo);
            } else if (currentDeceased.conservation_id !== null && !conservationInfoValues.length) {
                // 4.3 sinon si currentDeceased.conservation_id !== null && conservationInfo ne contient pas de données :
                    // faire une méthode datamapper deleteConservation
                    // appeler cette méthode en lui passant currentDeceased.conservation_id
                await dataMapper.deleteConservation(currentDeceased.conservation_id);
            }

            // 5. faire l'update du deceased_ref s'il y a de nouvelles données 
                // d'un côté, j'ai deceasedRefInfo (ref_firstname, ref_lastname, address, zip_code, city, email, tel) et de l'autre j'ai currentDeceased qui contient deceased_ref_id, deceased_ref_firstname, ...lastname, ...address, ...zip_code, ...city, ...email, ...tel
                // les cas possibles : 
                    // - pas de currentDeceased.deceased_ref_id (null) (donc il n'existe pas en bdd) et pas de deceasedRefInfo --> donc ne rien faire
                    // - pas de currentDeceased.deceased_ref_id (null) (donc il n'existe pas en bdd) et des nouvelles données dans deceasedRefInfo --> add
                    // - un currentDeceased.deceased_ref_id et pas de données dans deceasedRefInfo --> delete
                    // - un currentDeceased.deceased_ref_id et des nouvelles données dans deceasedRefInfo --> update

                // d'abord, je contruis le tableau des éventuelles valeurs pour pouvoir conditionner dessus ensuite
            let deceasedRefInfoValues = [];

            for (let value of Object.values(deceasedRefInfo)) {
                if (value) {
                    deceasedRefInfoValues.push(value);
                }
            }
                // 5.1 si currentDeceased.deceased_ref_id === null && deceasedRefInfo contient des données:
            if (currentDeceased.deceased_ref_id === null && deceasedRefInfoValues.length) {
                    // appeler datamapper pour ajouter le deceased_ref en lui passant deceasedRefInfo (faire le traitement pour les valeurs obligatoires ?)
                const newDeceasedRef = await dataMapper.addDeceasedRef(deceasedRefInfo);
                    // appeler datamapper pour update deceased sur le champ deceased_ref_id (updateDeceasedOnDeceasedRefId) en lui passant updatedDeceased.id et newDeceasedRef.id
                await dataMapper.updateDeceasedOnDeceasedRefId(currentDeceased.id, newDeceasedRef.id);
            } else if (currentDeceased.deceased_ref_id !== null && deceasedRefInfoValues.length) {
                // 5.2 sinon si currentDeceased.deceased_ref_id !== null && deceasedRefInfo contient des données:
                    // faire la méthode datamapper updateDeceasedRef (prévoir des données null)
                    // appeler cette méthode en lui passant currentDeceased.deceased_ref_id et deceasedRefInfo
                await dataMapper.updateDeceasedRef(currentDeceased.deceased_ref_id, deceasedRefInfo);
            } else if (currentDeceased.deceased_ref_id !== null && !deceasedRefInfoValues.length) {
                // 5.3 sinon si currentDeceased.deceased_ref_id !== null && deceasedRefInfo ne contient pas de données :
                    // faire une méthode datamapper deleteDeceasedRef
                    // appeler cette méthode en lui passant currentDeceased.deceased_ref_id
                await dataMapper.deleteDeceasedRef(currentDeceased.deceased_ref_id);
            }

            // 6. renvoyer les infos nécessaires au front 
                // 6.1 appeler datamapper pour les détails d'un défunt en lui passant updatedDeceased.id
            const updatedDeceasedAllInfos = await dataMapper.getOneDeceased(deceasedId);

            // construction d'un objet pour isoler les dates 
            const dates = {
                birth_date: updatedDeceasedAllInfos.birth_date, 
                deceased_date: updatedDeceasedAllInfos.deceased_date, 
                entry_date: updatedDeceasedAllInfos.entry_date, 
                exit_date: updatedDeceasedAllInfos.exit_date, 
                burial_permit_date: updatedDeceasedAllInfos.burial_permit_date, 
                conservation_date: updatedDeceasedAllInfos.conservation_date
            };

            // boucle sur le précédent objet pour formater chaque date et remplacer les dates d'un défunt par les dates du nouvel objet pour avoir les bons formats de date 
            for (let date in dates) {
                if (dates[date] !== null) {
                    // console.log(dates[date]);
                    dates[date] = moment(dates[date], "DD/MM/YYYY").format("DD/MM/YYYY");
                    // console.log('dates : ' + dates[date]);
                    // console.log('oneDeceased : ' + oneDeceased[date]);
                    updatedDeceasedAllInfos[date] = dates[date];
                } 
            }

                // 6.2 renvoyer les données
            res.send(updatedDeceasedAllInfos);

        } catch(err){
            console.trace(err);
            res.status(500).send(err);
        }
    },
};

module.exports = deceasedController;