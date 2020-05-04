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
    }
}



module.exports=deceasedController;