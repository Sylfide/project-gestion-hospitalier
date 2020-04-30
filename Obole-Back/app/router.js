const express = require('express');

const router = express.Router();

// require des controllers
const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');

// les routes
router.get('/', mainController.homePage);

// routes pour les admins / gestion des users
router.get('/admin/user/list', userController.allUsers);
router.post('/admin/user/new', userController.newUser);

// routes profil
router.get('/user/:id', userController.oneUser);
router.patch('/user/:id', userController.updateUser);

// traitement 404
router.use( (req, res) => {res.status(404).send('404')});

module.exports = router;