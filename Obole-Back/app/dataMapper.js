const db = require('./db_connection');

const dataMapper = {

    getAllUsers: async () => {
        
        const allUsers = await db.query(`SELECT * FROM "user";`);
        console.log(allUsers.rows);
        return allUsers.rows;
    },

    getOneUser: async (userId) => {

        const oneUser = await db.query(`SELECT * FROM "user" WHERE id = $1`, [userId]);
        console.log(oneUser.rows[0]);
        return oneUser.rows[0];
    },

    connection:async(email,password)=>{
        

        const SHA256 = require('crypto-js/sha256');
        const encBase64 = require('crypto-js/enc-base64');

        const salt=password.substring(0,3)

        const hashedPassword=SHA256(password+salt).toString(encBase64);
        const user=await db.query(`SELECT * FROM "user" WHERE email=$1 AND password=$2`,[email,hashedPassword]);
       
        return user.rows;
    },

    addRoom:async(name,capacity)=>{

        console.log(name);
        console.log(capacity);
        const insert=await db.query("INSERT INTO room (name,capacity) VALUES ($1,$2)",[name,capacity]);
        
        console.log(insert)
    }


};

module.exports = dataMapper;