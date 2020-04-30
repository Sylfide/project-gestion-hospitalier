const dataMapper = require('../dataMapper');

const userController = {

    allUsers: async (req, res) => {
         
        try {
            const users = await dataMapper.getAllUsers();
            console.log(users);

            res.send(users);
        } catch(err){
            console.trace(err);
            res.status(500).send(500, {err});
        }
        
    },

    // à faire : one user et new user et update user

    // oneUser: async (req, res) => {
    //     try {
    //         const userId = req.params.id;
// 
    //         const oneUser = await db.query(`SELECT * FROM "user" WHERE id = $1`, [userId]);
// 
    //         console.log(oneUser.rows[0]);
// 
    //         res.send(oneUser.rows[0]);
    //     } catch(err) {
    //         console.trace(err);
    //         res.status(500).send(500, {err});
    //     }
    // },
// 
    // newUser: async (req, res) => {
    //     res.send('coucou');
    // }
};

module.exports = userController;