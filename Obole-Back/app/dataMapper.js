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
    }
};

module.exports = dataMapper;