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
    }
}



module.exports=deceasedController;