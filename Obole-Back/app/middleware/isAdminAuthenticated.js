const db=require('../db_connection.js')
 const isAdminAuthenticated=async(req,res,next)=>{
    if(req.headers.authorization){
       
        const userToken=req.headers.authorization.replace("Bearer ","");
        console.log(userToken);
       
        const findUser=await db.query(`SELECT * FROM "user" WHERE token=$1`,[userToken]);
        console.log(findUser.rows);
        
        if(findUser.rows[0]){ 
            if(findUser.rows[0].role!='ROLE_ADMIN'){
                res.status(401).json({message:'unauthorized'})
            }
            else{
                req.user=findUser.rows[0]
                next()
            }
            
        }

        else{
            res.status(401).json({message:'unauthorized'})
        }
    }

    else{
        res.status(400).json({message:'no token sent'})
    }
 }
    


module.exports=isAdminAuthenticated;