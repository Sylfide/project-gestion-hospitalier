const db = require('./db_connection');

const dataMapper = {

    getAllUsers: async () => {
        
        const allUsers = await db.query(`SELECT * FROM "user";`);
        return allUsers;
    }
};

module.exports = dataMapper;