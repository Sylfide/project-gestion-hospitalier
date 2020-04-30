

const isUserAuthenticated=async(req,res,next)=>{

    const pg=require('pg');
    const connectionString=process.env.DB_NAME
    const client = new pg.Client(connectionString);

client.connect();
    if(req.headers.authorization){
        const userToken=req.headers.authorization.replace("Bearer ","");
        const findUser=await client.query(`SELECT * FROM user WHERE token=$1`,[userToken]);
        if(findUser.rows[0]){ 
            
            req.user=findUser.rows[0]
            next()
        }

        else{
            res.status(401).json({message:'unauthorized'})
        }
    }

    else{
        res.status(400).json({message:'no token sent'})
    }
}

module.exports=isUserAuthenticated;