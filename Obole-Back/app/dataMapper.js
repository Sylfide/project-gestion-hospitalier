const db = require('./db_connection');

const dataMapper = {

    getAllUsers: async () => {
        
        const allUsers = await db.query(`SELECT * FROM "user";`);
        console.log(allUsers.rows);
        return allUsers.rows;
    }
};

module.exports = dataMapper;