
const dataMapper = require('../dataMapper');
const encBase64 = require('crypto-js/enc-base64');
const SHA256 = require('crypto-js/sha256');

const mainController = {

    homePage:(req,res)=>{
        res.json({message:'welcome to the home page'})
    },

    connection:async(req,res)=>{
        try{
         
            // console.log(req.fields);
            // console.log('C\'est le body', req.body);
           
            const findUser=await dataMapper.connection(req.body.email);

            // ici comparer le mdp reçu et le mdp de findUser
            
            // console.log('mainController - postDm', findUser);
            if(!findUser){

                // console.log('not defined')
                res.status(401).json({message:'Cet utilisateur n\'existe pas'});
                
            }
            else {

                // const findUserInfo={
                //     email:findUser.email,
                //     role:findUser.role,
                //     firstname:findUser.firstname,
                //     lastname:findUser.lastname,
                //     token:findUser.token
                // }

                const salt = req.body.password.substring(0,3);
                // console.log(salt);
                const hashedPassword=SHA256(req.body.password+salt).toString(encBase64);
                // console.log(hashedPassword);
                // console.log(findUser);

                if(hashedPassword === findUser.password) {

                    Reflect.deleteProperty(findUser, 'password')
            
                    // console.log(findUser);
                    res.status(200);
                    res.send(findUser);
                } else {
                    res.status(401).json({message:'Erreur de mot de passe'});
                }

                
            }
           

            
            
        }

        catch(error){
            
            res.send(error)
        }
       

        
    }


};

module.exports = mainController;