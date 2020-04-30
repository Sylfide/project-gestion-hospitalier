const dataMapper = require('../dataMapper');

const roomController={
    addRoom:async(req,res)=>{
        try{
            await dataMapper.addRoom(req.fields.name,req.fields.capacity);
        
            res.json({message:'chambre inseré avec sucés'})
        
    }
    catch(error){
        res.json(error.message);
    }
        
        
    }
}

module.exports=roomController;