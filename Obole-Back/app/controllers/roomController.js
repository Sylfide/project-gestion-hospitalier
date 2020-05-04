const dataMapper = require('../dataMapper');

const roomController={
    addRoom:async(req,res)=>{
        try{
           const newRoom= await dataMapper.addRoom(req.body.name,req.body.capacity);
            res.json(newRoom);
        
    }
    catch(error){
        res.json(error.message);
    }
        
        
    },

    modifyRoom:async(req,res)=>{
        try{
            const modifiedRoom=await dataMapper.modifyRoom(req.body.name,req.body.capacity,req.params.id);
            console.log(req.body);
            res.json(modifiedRoom);
            //res.json({message:'room sucessfully updated'});
        }

        catch(error){
            res.json(error.message);
        }
    },

    seeRoom:async(req,res)=>{
        try{
            const room=await dataMapper.seeRoom(req.params.id);
            console.log(room);
            if(room){
                res.json(room);
            }

            else{
                res.json('no result found')
            }
            
        }

        catch(error){
            res.json(error.message);
        }
    },

    listRooms:async(req,res)=>{
        try{
            const rooms=await dataMapper.listRooms();
            res.json(rooms);
        }

        catch(error){
            res.json(error.message)
        }
    }
}

module.exports=roomController;