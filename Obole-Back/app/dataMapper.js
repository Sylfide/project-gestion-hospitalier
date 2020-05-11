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
        const modifiedRoom=await db.query("UPDATE room set occupation=$1 WHERE id=$2 RETURNING *;",[currentOccupation+1,roomId]);
        return modifiedRoom.rows[0];
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

    getRoomByName: async (roomName) => {
        const roomId = await db.query(`SELECT id FROM room WHERE "name" = $1;`, [roomName]);
        return roomId.rows[0];
    },

    listRooms:async()=>{
        const rooms=await db.query(`SELECT * FROM room`);
        
        return rooms.rows
    },


    enterDeceased:async (deceasedInfo)=>{
        try{
       
            // deceasedInfo contient : lastname, firstname, birth_date, deceased_date, entry_date, burial_permit_date, provenance, exit_date, ritual, room et roomId

            const newDeceased = {};

            for (let [keyInfo, valueInfo] of Object.entries(deceasedInfo)) {
                if (!valueInfo) {
                    newDeceased[keyInfo] = null;
                } else {
                    newDeceased[keyInfo] = valueInfo;
                }
            }

            const { lastname, firstname, birth_date, deceased_date, entry_date, burial_permit_date, provenance, exit_date, ritual, roomId } = newDeceased;

            const addedDeceased = await db.query(`INSERT INTO deceased (lastname, firstname, birth_date, deceased_date, entry_date, burial_permit_date, provenance, exit_date, ritual, room_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`, [lastname, firstname, birth_date, deceased_date, entry_date, burial_permit_date, provenance, exit_date, ritual, roomId]);

            return addedDeceased.rows[0];
            
            
        }

        catch(error){
            console.log(error.message);
        }
        
    },
    
    removeDeceased: async (deceasedId) => {
        
        const momentDate = moment().format();
        
        const updateDeceased = await db.query(`UPDATE deceased SET exit_date = $1 WHERE id = $2`, [momentDate, deceasedId]);
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

    getOneDeceasedWithoutId: async (deceasedInfo) => {

        const { lastname, firstname, birth_date, deceased_date } = deceasedInfo;

        const oneDeceased = await db.query(`SELECT * FROM deceased WHERE lastname = $1 AND firstname = $2 AND birth_date = $3 AND deceased_date = $4;`, [lastname, firstname, birth_date, deceased_date]);

        return oneDeceased.rows[0];
    }, 

    updateDeceased: async (deceasedId, deceasedInfo) => {

        // deceasedInfo contient : lastname, firstname, birth_date, deceased_date, entry_date, burial_permit_date, provenance, exit_date, ritual, room et room_id
        // il me faut : lastname, firstname, birth_date, deceased_date, entry_date, burial_permit_date, provenance, exit_date, ritual, room_id

        delete deceasedInfo.room;

        const deceased = {};

        for (let [keyInfo, valueInfo] of Object.entries(deceasedInfo)) {
            if (valueInfo) {
                deceased[keyInfo] = valueInfo;

                await db.query("UPDATE deceased SET "+keyInfo+" = $1 WHERE id = $2;", [valueInfo, deceasedId]);
            }
        }

        const updatedDeceased = await db.query(`SELECT * FROM deceased_infos WHERE id = $1;`, [deceasedId]);

        return updatedDeceased.rows[0];
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

    getOneDeceasedWithoutId: async (deceasedInfo) => {

        const { lastname, firstname, birth_date, deceased_date } = deceasedInfo;

        const oneDeceased = await db.query(`SELECT * FROM deceased WHERE lastname = $1 AND firstname = $2 AND birth_date = $3 AND deceased_date = $4;`, [lastname, firstname, birth_date, deceased_date]);

        return oneDeceased.rows[0];
    }, 

    updateDeceased: async (deceasedId, deceasedInfo) => {

        const deceased = {};

        for (let [keyInfo, valueInfo] of Object.entries(deceasedInfo)) {
            if (!valueInfo) {
                deceased[keyInfo] = null;
            } else {
                deceased[keyInfo] = valueInfo;
            }
        }

        // console.log(deceased);

        const { lastname, firstname, birth_date, deceased_date, entry_date, burial_permit_date, provenance, exit_date, ritual, room_id } = deceased;

        if (deceased.exit_date === null) {

            const updatedDeceased = await db.query(`UPDATE deceased SET lastname = $1, firstname = $2, birth_date = $3, deceased_date = $4, entry_date = $5, burial_permit_date = $6, provenance = $7, exit_date = $8, ritual = $9, room_id = $10 WHERE id = $11 RETURNING *;`, [lastname, firstname, birth_date, deceased_date, entry_date, burial_permit_date, provenance, exit_date, ritual, room_id, deceasedId]);

            return updatedDeceased.rows[0];

        } else {

            const updatedDeceased = await db.query(`UPDATE deceased SET lastname = $1, firstname = $2, birth_date = $3, deceased_date = $4, entry_date = $5, burial_permit_date = $6, provenance = $7, ritual = $8, room_id = $9 WHERE id = $10 RETURNING *;`, [lastname, firstname, birth_date, deceased_date, entry_date, burial_permit_date, provenance, ritual, room_id, deceasedId]);

            return updatedDeceased.rows[0];
        }
    },

    updateDeceasedOnDeceasedRefId : async (deceasedId, deceasedRefId) => {

        await db.query(`UPDATE deceased SET deceased_ref_id = $1 WHERE id = $2;`, [deceasedRefId, deceasedId]);
    },

    addConservation: async (deceasedId, conservationInfo) => {

        // conservationInfo contient : date, embalmer_id
        
        const { date, embalmer_id } = conservationInfo;

        const addedConservation = await db.query(`INSERT INTO conservation (date, deceased_id, embalmer_id) VALUES
            ($1, $2, $3) RETURNING id, date, deceased_id, embalmer_id;`, [date, deceasedId, embalmer_id]);

        return addedConservation.rows[0];
    },

    updateConservation: async (deceasedId, conservationInfo) => {

        // conservationInfo contient : date, embalmer_id

        const conservation = {};

        for (let [keyInfo, valueInfo] of Object.entries(conservationInfo)) {
            if (valueInfo) {
                conservation[keyInfo] = valueInfo;

                await db.query("UPDATE conservation SET "+keyInfo+" = $1 WHERE deceased_id = $2", [valueInfo, deceasedId]);
            }
        }

        const updatedConservation = await db.query(`SELECT * FROM conservation WHERE deceased_id = $1;`, [deceasedId]);

        return updatedConservation.rows[0];

    },

    deleteConservation: async (conservationId) => {
        const deletedConservation = await db.query(`DELETE FROM conservation WHERE id = $1 RETURNING *;`, [conservationId]);

        return deletedConservation.rows[0];
    },

    addDeceasedRef: async (deceasedRefInfo) => {

        // deceasedRefInfo contient = ref_firstname, ref_lastname, address, zip_code, city, email, tel
        // donc, il faut rajouter deux propriétés firstname et lastname qui prendront les valeurs de ref_firstname et ref_lastname et supprimer ces deux dernières de l'objet

        const newDeceasedRef = {};

        for (let [keyInfo, valueInfo] of Object.entries(deceasedRefInfo)) {
            if (!valueInfo) {
                newDeceasedRef[keyInfo] = null;
            } else {
                newDeceasedRef[keyInfo] = valueInfo;
            }
        }

        newDeceasedRef.firstname = newDeceasedRef.ref_firstname;
        newDeceasedRef.lastname = newDeceasedRef.ref_lastname;

        delete newDeceasedRef.ref_firstname;
        delete newDeceasedRef.ref_lastname;

        const { lastname, firstname, address, zip_code, city, email, tel } = newDeceasedRef;

        const addedDeceasedRef = await db.query(`INSERT INTO deceased_ref (lastname, firstname, "address", zip_code, city, email, tel) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [lastname, firstname, address, zip_code, city, email, tel]);

        return addedDeceasedRef.rows[0];
    },

    updateDeceasedRef: async (deceasedRefId, deceasedRefInfo) => {

        // deceasedRefInfo contient = ref_firstname, ref_lastname, address, zip_code, city, email, tel (valeurs potentiellement null)
        // donc, il faut rajouter deux propriétés firstname et lastname qui prendront les valeurs de ref_firstname et ref_lastname et supprimer ces deux dernières de l'objet

        const newDeceasedRef = {};

        for (let [keyInfo, valueInfo] of Object.entries(deceasedRefInfo)) {
            if (!valueInfo) {
                newDeceasedRef[keyInfo] = null;
            } else {
                newDeceasedRef[keyInfo] = valueInfo;
            }
        }

        newDeceasedRef.firstname = newDeceasedRef.ref_firstname;
        newDeceasedRef.lastname = newDeceasedRef.ref_lastname;

        delete newDeceasedRef.ref_firstname;
        delete newDeceasedRef.ref_lastname;

        const { lastname, firstname, address, zip_code, city, email, tel } = newDeceasedRef;

        const updatedDeceasedRef = await db.query(`UPDATE deceased_ref SET lastname = $1, firstname = $2, address = $3, zip_code = $4, city = $5, email = $6, tel = $7 WHERE id = $8 RETURNING *;`, [lastname, firstname, address, zip_code, city, email, tel, deceasedRefId]);

        return updatedDeceasedRef.rows[0];
    },

    deleteDeceasedRef: async (deceasedRefId) => {
        const deletedDeceasedRef = await db.query(`DELETE FROM deceased_ref WHERE id = $1 RETURNING *;`, [deceasedRefId]);

        return deletedDeceasedRef.rows[0];
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