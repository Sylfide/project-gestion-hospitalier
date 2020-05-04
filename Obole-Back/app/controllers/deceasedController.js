const dataMapper = require('../dataMapper');

const deceasedController={
    enterDeceased:async(req,res)=>{
        try{
            

            const insertion= await dataMapper.enterDeceased(req);
    
           
            res.json(insertion);

            
            
        }
        catch(error){
            return error.message;
        }
       
    },
    removeDeceased:async(req,res)=>{
        try{
            const updateDeceased=await dataMapper.removeDeceased(req.params.id);
            res.json({message:'le defunt est bien sorti'});
        }
        catch(error){
            res.json(error.message);
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

        } catch(err){
            console.trace(err);
            res.status(500).send(err);
        }
    }
}



module.exports=deceasedController;