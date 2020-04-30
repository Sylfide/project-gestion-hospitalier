
const dataMapper=require('../dataMapper')
const mainController = {

    homePage:(req,res)=>{
        res.json({message:'welcome to the home page'})
    },

    connection:async(req,res)=>{
        try{
         
            //console.log(hashedPassword);
           
            const findUser=await dataMapper.connection(req.fields.email,req.fields.password)
            
            
            if(findUser[0]){
                res.send(findUser[0])
            }
    
            else{
                console.log('else phase')
                res.json({message:'invalid email or password'});
            }
            
        }

        catch(error){
            
            res.send(error)
        }
       

        
    }


};

module.exports = mainController;