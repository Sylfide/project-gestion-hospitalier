const db = require('./db_connection');
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');

const dataMapper = {

    getAllUsers: async () => {
        
        const allUsers = await db.query(`SELECT * FROM "user";`);
        // console.log(allUsers.rows);
        return allUsers.rows;
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
    }
};

module.exports = dataMapper;