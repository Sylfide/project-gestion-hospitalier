const db=require('./db_connections');

const dataMapper={
    connection:async(email,password)=>{
        

        const SHA256 = require('crypto-js/sha256');
        const encBase64 = require('crypto-js/enc-base64');

        const salt=password.substring(0,3)

        const hashedPassword=SHA256(password+salt).toString(encBase64);
        const user=await db.query(`SELECT * FROM "user" WHERE email=$1 AND password=$2`,[email,hashedPassword]);
       
        return user.rows;
    }
}

module.exports=dataMapper;