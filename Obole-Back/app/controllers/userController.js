const dataMapper = require('../dataMapper');
const uid2 = require('uid2');

const userController = {

    allUsers: async (req, res) => {
         
        try {
            const users = await dataMapper.getAllUsers();
            // console.log(users);

            res.send(users);
        } catch(err){
            console.trace(err);
            res.status(500).send(500, {err});
        }
        
    },

 

    // à faire : one user et new user et update user

    oneUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const oneUser = await dataMapper.getOneUser(userId);
            
            res.send(oneUser);
        } catch(err) {
            console.trace(err);
            res.status(500).send(500, {err});
        }
    },

    newUser: async (req, res) => {
        
        try {
             console.log(req.body);
            if (!req.body.firstname || !req.body.lastname || !req.body.role || !req.body.email || !req.body.password) {
                return res.send('Veuillez remplir tous les champs');
            }
            
            let token=uid2(64);

            let result = await dataMapper.addUser(req.body, token);
             console.log(result);

            if (result === 'Cet utilisateur existe déjà') {
                res.send(result);
            } else {
                res.redirect('/admin/user/list');
            }

        } catch(err) {
            console.trace(err);
            res.status(500).send(500, {err});
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const updatedUser = await dataMapper.updateUser(userId, req.body);

            res.send(updatedUser);

        } catch(err) {
            console.trace(err);
            res.status(500).send(500, {err});
        }
    },

    deleteOneUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const deletedUser = await dataMapper.deleteUser(userId);

            if (deletedUser) {
                const userList = await dataMapper.getAllUsers();
                res.send(userList);
            } else {
                res.send(`Suppression échouée`);
            }

        } catch(err) {
            console.trace(err);
            res.status(500).send(500, {err});
        }
    }
};

module.exports = userController;