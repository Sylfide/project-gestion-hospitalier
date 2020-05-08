const dataMapper = require('../dataMapper');
const sendMail=require('../email/send-email');
const deceasedController={
    enterDeceased:async(req,res)=>{
        try{
            
           
            

            const insertion= await dataMapper.enterDeceased(req);

           
            //console.log(insertion);
            const admins=await dataMapper.getAdmins();
            console.log(admins);

            
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