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

        const { firstname, lastname, role, email, password, tel} = userInfo;

        const salt=password.substring(0,3);
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

        const user = {};

        for (let [keyInfo, valueInfo] of Object.entries(userInfo)) {
            if (valueInfo) {
                user[keyInfo] = valueInfo;

                await db.query(`UPDATE "user" SET `+keyInfo+` = $1 WHERE id = $2;`, [valueInfo, userId]);
            }
        }

        const updatedUser = await db.query(`SELECT * FROM "user" WHERE id = $1;`, [userId]);

        return updatedUser.rows[0];
    },

    deleteUser: async (userId) => {

        const deletedUser = await db.query(`DELETE FROM "user" WHERE id = $1 RETURNING firstname, lastname, email, password, token`, [userId]);

        return deletedUser.rows[0];
    },

    connection:async(email)=>{

      
        // const salt=password.substring(0,3);

        // console.log(email);

        // const hashedPassword=SHA256(password+salt).toString(encBase64);
        const findeduser = await db.query(`SELECT * FROM "user" WHERE "email" = $1;`, [email]);

        // console.log(findeduser.rows[0]);

        return findeduser.rows[0];
       
        
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
       

        const objectDeceased={};

        const objectEntires=Object.entries(req.body);

        for(let[keyInfo,valueInfo] of objectEntires){
            if(valueInfo){
                objectDeceased[keyInfo]=valueInfo
            }
        }

        const deceasedKeys=Object.keys(objectDeceased);
        const deceasedValues=Object.values(objectDeceased);
      

        const parameterArr=[];
      

        for(let i=0;i<deceasedKeys.length;i++){
            
                let number=i+1;
                let parameter="$"+number;
                parameter=parameter.toString();
                parameterArr.push(parameter)
            
        }


       const parameterStr=[...parameterArr].join(',');

        
        const insertDeceased =await db.query("INSERT INTO deceased ("+deceasedKeys+") VALUES ("+parameterStr+") RETURNING "+deceasedKeys+"",[...deceasedValues]);

      
        
        return insertDeceased.rows[0];
        }

        catch(error){
            console.log(error.message);
        }
        
    },
    
    removeDeceased:async(deceasedId)=>{
        
        const momentDate=moment().format();
        
        const updateDeceased=await db.query(`UPDATE deceased SET exit_date=$1 WHERE id=$2`,[momentDate,deceasedId])
    },
    
    getAllPresentDeceased: async () => {

        const allPresentDeceased = await db.query(`SELECT * FROM deceased WHERE exit_date IS NULL;`);

        return allPresentDeceased.rows;
    },

    getAllDeceased: async () => {

        const allDeceased = await db.query(`SELECT * FROM deceased;`);

        return allDeceased.rows;
    },

    getOneDeceased: async (deceasedId) => {

        const oneDeceased = await db.query(`SELECT * FROM deceased_infos WHERE id = $1;`, [deceasedId]);

        return oneDeceased.rows[0];

    },

    addConservation: async (deceasedId, conservationInfo) => {

        const { date, embalmer } = conservationInfo;

        const embalmerToArray = embalmer.split(' ');
        const embalmerLastname = embalmerToArray[1];
        const embalmerFirstname = embalmerToArray[0];

        const embalmerId = await db.query(`SELECT id FROM embalmer WHERE lastname = $1 AND firstname = $2;`, [embalmerLastname, embalmerFirstname]);

        const addedConservation = await db.query(`INSERT INTO conservation (date, deceased_id, embalmer_id) VALUES
            ($1, $2, $3) RETURNING id, date, deceased_id, embalmer_id;`, [date, deceasedId, embalmerId]);

        return addedConservation.rows[0];
    },

    updateConservation: async (deceasedId, conservationInfo) => {

        const conservation = {};

        for (let [keyInfo, valueInfo] of Object.entries(conservationInfo)) {
            if (valueInfo) {
                conservation[keyInfo] = valueInfo;

                await db.query("UPDATE conservation SET "+keyInfo+" = $1 WHERE deceased_id = $2", [valueInfo, deceasedId]);
            }
        }

        const updatedConservation = await db.query(`SELECT * FROM conservation WHERE deceaced_id = $1;`, [deceasedId]);

        return updatedConservation.rows[0];

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

        const embalmerEmail = embalmerInfo.email;

        const existingEmbalmer = await db.query(`SELECT * FROM embalmer WHERE email = $1;`, [embalmerEmail]);

        const newEmbalmer = {};

        for (let [keyInfo, valueInfo] of Object.entries(embalmerInfo)) {
            if (!valueInfo) {
                newEmbalmer[keyInfo] = null;
            } else {
                newEmbalmer[keyInfo] = valueInfo;
            }
        }

        // console.log(newEmbalmer);

        const { lastname, firstname, address, zip_code, city, email, tel } = newEmbalmer;

        if (existingEmbalmer.rows[0]) {
            return `Ce thanatopracteur existe déjà`
        } else {

            const addedEmbalmer = await db.query(`INSERT INTO embalmer (lastname, firstname, address, zip_code, city, email, tel) VALUES
                ($1, $2, $3, $4, $5, $6, $7) RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [lastname, firstname, address, zip_code, city, email, tel]);

            return addedEmbalmer.rows[0];
        }

    },

    updateEmbalmer: async (embalmerId, embalmerInfo) => {

        const embalmer = {};

        for (let [keyInfo, valueInfo] of Object.entries(embalmerInfo)) {
            if (valueInfo) {
                embalmer[keyInfo] = valueInfo;

                await db.query("UPDATE embalmer SET "+keyInfo+" = $1 WHERE id = $2", [valueInfo, embalmerId]);
            }
        }

        const updatedEmbalmer = await db.query(`SELECT * FROM embalmer WHERE id = $1;`, [embalmerId]);

        return updatedEmbalmer.rows[0];
    },

    deleteEmbalmer: async (embalmerId) => {

        const deletedEmbalmer = await db.query(`DELETE FROM embalmer WHERE id = $1 RETURNING lastname, firstname, address, zip_code, city, email, tel;`, [embalmerId]);

        return deletedEmbalmer.rows[0];
    },
};

module.exports = dataMapper;