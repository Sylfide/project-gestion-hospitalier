const db = require('./db_connection');
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');

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

    addUser: async (userInfo, token) => {

        const { firstname, lastname, role, email, password } = userInfo;

        const salt=uid2(12);
        const hashedPassword= SHA256(password+ salt).toString(encBase64);

        const addUser = await db.query(`INSERT INTO "user" (firstname, lastname, role, email, password, token)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING firstname, lastname, role, email, password, token;`, [firstname, lastname, role, email, hashedPassword, token]);
        return addUser.rows[0];
    }
};

module.exports = dataMapper;