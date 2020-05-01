const db = require('./db_connection');
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const moment=require('moment');

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

      

        const salt=password.substring(0,3)

        const hashedPassword=SHA256(password+salt).toString(encBase64);
        const user=await db.query(`SELECT * FROM "user" WHERE email=$1 AND password=$2`,[email,hashedPassword]);

        return user.rows;
       
        
    },

    addRoom:async(name,capacity)=>{

        console.log(name);
        console.log(capacity);
        const insert=await db.query("INSERT INTO room (name,capacity) VALUES ($1,$2) RETURNING name,capacity",[name,capacity]);
        
        return insert.rows[0];
    },

    modifyRoom:async(name,capacity,roomId)=>{
        if(name){
            await db.query(`UPDATE room SET name=$1 WHERE id=$2`,[name,roomId])
         
        }

        if(capacity){
           await db.query(`UPDATE room SET capacity=$1 WHERE id=$2`,[capacity,roomId])
            
        }

        const modifiedRoom=await db.query("SELECT * FROM room WHERE id=$1",[roomId]);
        console.log(modifiedRoom.rows[0]);
        return modifiedRoom.rows[0];
        
    },

    seeRoom:async(roomId)=>{
       const room= await db.query(`SELECT * FROM room WHERE id=$1`,[roomId]);
       
       return room.rows;

    },

   

    listRooms:async()=>{
        const rooms=await db.query(`SELECT * FROM room`);
        
        return rooms.rows
    },


    enterDeceased:async (req)=>{
        try{
            const objectKeys=Object.keys(req.fields);
        const objectValues=Object.values(req.fields);
        const splitKeys=[...objectKeys].join(',');
        const splitValues=[...objectValues].join(',');

        console.log(...objectValues);

        //console.log(splitKeys);
        //console.log(splitValues);

        const parameterArr=[];
      

        for(let i=0;i<objectKeys.length;i++){
            
            if(objectKeys[i]=="deceased_date" || objectKeys[i]=="entry_date"){
                let number=i+1;
                let parameter="$"+number;
                parameter=parameter.toString();
                parameterArr.push(parameter)
             
            }

            else{
               let number=i+1;
               let parameter="$"+number;
               parameter=parameter.toString();
               parameterArr.push(parameter);
            }

            
        }


       const parameterStr=[...parameterArr].join(',');

        const string="INSERT INTO deceased ("+splitKeys+") VALUES ("+parameterStr+") RETURNING "+splitKeys+"";
        //console.log(string);
        //console.log(splitValues);
        
        
        const insertDeceased =await db.query("INSERT INTO deceased ("+splitKeys+") VALUES ("+parameterStr+") RETURNING "+splitKeys+"",[...objectValues]);
        //console.log(insertDeceased.rows);
        return insertDeceased.rows;
        }

        catch(error){
            console.log(error.message);
        }
        
    },

    getAllDeceased:async()=>{
        const deceasedList=await db.query("SELECT * FROM deceased");
        return deceasedList.rows;
    },

    removeDeceased:async(deceasedId)=>{

        const momentDate=moment().format();

        const updateDeceased=await db.query(`UPDATE deceased SET exit_date=$1 WHERE id=$2`,[momentDate,deceasedId])
    }





};

module.exports = dataMapper;