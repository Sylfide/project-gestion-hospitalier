
const dataMapper = require('../dataMapper');
const mainController = {

    homePage:(req,res)=>{
        res.json({message:'welcome to the home page'})
    },

    connection:async(req,res)=>{
        try{
         
         
           
            const findUser=await dataMapper.connection(req.fields.email,req.fields.password)
            
        
            if(findUser[0]){
                const findUserInfo={
                    email:findUser[0].email,
                    role:findUser[0].role,
                    firstname:findUser[0].firstname,
                    lastname:findUser[0].lastname,
                    token:findUser[0].token
                }

                console.log('user actually exsits')
                res.send(findUserInfo)
            }
            else{
                console.log('not defined')
                res.status(401).json({message:'invalid username or password'});
            }
           

            
            
        }

        catch(error){
            
            res.send(error)
        }
       

        
    }


};

module.exports = mainController;