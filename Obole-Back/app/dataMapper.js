const db = require('./db_connection');
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');

const moment=require('moment');
const uid2 = require('uid2');


const dataMapper = {

    getAllUsers: async () => {
        try{
            const allUsers = await db.query(`SELECT * FROM "user";`);
        // console.log(allUsers.rows);
        return allUsers.rows;
        }

        catch(error){
            res.json(error.message);
        }
        
    },

    getAdmins:async()=>{
        
        const adminUsers=await db.query(`SELECT * FROM "user" WHERE role=$1`,['admin']);
        return adminUsers.rows;
    },

    

    getOneUser: async (userId) => {

        const oneUser = await db.query(`SELECT * FROM "user" WHERE id = $1`, [userId]);
        // console.log(oneUser.rows[0]);
        return oneUser.rows[0];
    },

    addUser: async (userInfo, token) => {

        const { firstname, lastname, role, email, password } = userInfo;

        const salt=uid2(12);
        const hashedPassword= SHA256(password+ salt).toString(encBase64);

        const existingUser = await db.query(`SELECT * FROM "user" WHERE lastname = $1 AND firstname = $2 AND email = $3;`, [lastname, firstname, email]);
        // console.log(existingUser.rows);
        if (existingUser.rows[0]) {
            return `Cet utilisateur existe déjà`;
        } else {

            const addUser = await db.query(`INSERT INTO "user" (firstname, lastname, role, email, password, token)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING firstname, lastname, role, email, password, token;`, [firstname, lastname, role, email, hashedPassword, token]);
            return addUser.rows[0];
        }

    },

    updateUser: async (userId, userInfo) => {

        const { firstname, lastname, email, password } = userInfo;
        let updateUser;

        if (firstname) {
            updateUser = await db.query(`UPDATE "user" SET firstname = $1 WHERE id = $2 RETURNING firstname, lastname, role, email, password, token;`, [firstname, userId]);
        }

        if (lastname) {
            updateUser = await db.query(`UPDATE "user" SET lastname = $1 WHERE id = $2 RETURNING firstname, lastname, role, email, password, token;`, [lastname, userId]);
        }

        if (email) {
            updateUser = await db.query(`UPDATE "user" SET email = $1 WHERE id = $2 RETURNING firstname, lastname, role, email, password, token;`, [email, userId]);
        }

        if (password) {
            const salt = uid2(12);
            const hashedPassword = SHA256(password + salt).toString(encBase64);
            updateUser = await db.query(`UPDATE "user" SET password = $1 WHERE id = $2 RETURNING firstname, lastname, role, email, password, token;`, [hashedPassword, userId]);
        }

        return updateUser.rows[0];
    },

    deleteUser: async (userId) => {

        const deletedUser = await db.query(`DELETE FROM "user" WHERE id = $1 RETURNING firstname, lastname, email, password, token`, [userId]);

        return deletedUser.rows[0];
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

    incrementRoomCapacity:async(roomId)=>{
        const roomTargeted=await db.query("SELECT * FROM room WHERE id=$1",[roomId]);
        const currentOccupation=roomTargeted.rows[0].occupation;
        const modifiedRoom=await db.query("UPDATE room set occupation=$1 WHERE id=$2 RETURNING name,occupation,capacity",[currentOccupation+1,roomId]);
        return modifiedRoom.rows;
    },

    decrementRoomCapacity:async(roomId)=>{
        const roomTargeted=await db.query("SELECT * FROM room WHERE id=$1",[roomId]);
        const currentOccupation=roomTargeted.rows[0].occupation;

        const modifiedRoom=await db.query("UPDATE room set occupation=$1 WHERE id=$2",[currentOccupation-1,roomId]);
        return modifiedRoom.rows;
    },

    seeRoom:async(roomId)=>{
       const room= await db.query(`SELECT * FROM room WHERE id=$1`,[roomId]);
       
       return room.rows[0];

    },

   

    listRooms:async()=>{
        const rooms=await db.query(`SELECT * FROM room`);
        
        return rooms.rows
    },


    enterDeceased:async (req)=>{
        try{
        const objectKeys=Object.keys(req.body);
        const objectValues=Object.values(req.body);
        const splitKeys=[...objectKeys].join(',');
        const splitValues=[...objectValues].join(',');

        //console.log(...objectValues);

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

        //const getRoomInfo=await db.query("SELECT occupation FROM room WHERE id=$1",[getDeceased.rows[0].room_id]);
        //console.log(insertDeceased.rows);
        
        return insertDeceased.rows[0];
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
    },



    getAllEmbalmers: async () => {

        const allEmbalmers = await db.query(`SELECT * FROM embalmer;`);

        return allEmbalmers.rows;
    },

    getOneEmbalmer: async (embalmerId) => {

        const oneEmbalmer = await db.query(`SELECT * FROM embalmer WHERE id = $1;`, [embalmerId]);
        return oneEmbalmer.rows[0];
    },

    addEmbalmer: async (embalmerInfo) => {

        const { lastname, firstname, address, zip_code, city, email, tel } = embalmerInfo;

        const existingEmbalmer = await db.query(`SELECT * FROM embalmer WHERE lastname = $1 AND firstname = $2 AND email = $3 AND address = $4 AND zip_code = $5 AND city = $6;`, [lastname, firstname, email, address, zip_code, city]);

        if (existingEmbalmer.rows[0]) {
            return `Ce thanatopracteur existe déjà`
        } else if (!tel) {

            const addedEmbalmer = await db.query(`INSERT INTO embalmer (lastname, firstname, address, zip_code, city, email) VALUES
                ($1, $2, $3, $4, $5, $6) RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [lastname, firstname, address, zip_code, city, email]);

            return addedEmbalmer.rows[0];
        } else {

            const addedEmbalmer = await db.query(`INSERT INTO embalmer (lastname, firstname, address, zip_code, city, email, tel) VALUES
                ($1, $2, $3, $4, $5, $6, $7) RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [lastname, firstname, address, zip_code, city, email, tel]);

            return addedEmbalmer.rows[0];
        }

    },

    updateEmbalmer: async (embalmerId, embalmerInfo) => {

        const { lastname, firstname, address, zip_code, city, email, tel } = embalmerInfo;

        let updatedEmbalmer;

        if (lastname) {
            updatedEmbalmer = await db.query(`UPDATE embalmer SET lastname = $1 WHERE id = $2 RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [lastname, embalmerId]);
        }

        if (firstname) {
            updatedEmbalmer = await db.query(`UPDATE embalmer SET firstname = $1 WHERE id = $2 RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [firstname, embalmerId]);
        }

        if (address) {
            updatedEmbalmer = await db.query(`UPDATE embalmer SET address = $1 WHERE id = $2 RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [address, embalmerId]);
        }

        if (zip_code) {
            updatedEmbalmer = await db.query(`UPDATE embalmer SET zip_code = $1 WHERE id = $2 RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [zip_code, embalmerId]);
        }

        if (city) {
            updatedEmbalmer = await db.query(`UPDATE embalmer SET city = $1 WHERE id = $2 RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [city, embalmerId]);
        }

        if (email) {
            updatedEmbalmer = await db.query(`UPDATE embalmer SET email = $1 WHERE id = $2 RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [email, embalmerId]);
        }

        if (tel) {
            updatedEmbalmer = await db.query(`UPDATE embalmer SET tel = $1 WHERE id = $2 RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [tel, embalmerId]);
        }

        return updatedEmbalmer.rows[0];
    },

    deleteEmbalmer: async (embalmerId) => {

        const deletedEmbalmer = await db.query(`DELETE FROM embalmer WHERE id = $1 RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [embalmerId]);

        return deletedEmbalmer.rows[0];
    },
};

module.exports = dataMapper;