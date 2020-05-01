const express = require('express');

const router = express.Router();

// middlewares
const adminAuthentified = require('./middleware/isAdminAuthenticated');
const userAuthentified = require('./middleware/isUserAuthenticated');

// require des controllers
const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');

// les routes
router.get('/', mainController.homePage);

// routes pour les admins / gestion des users
router.get('/admin/user/list', adminAuthentified, userController.allUsers);
router.post('/admin/user/new', adminAuthentified, userController.newUser);
router.delete('/admin/user/:id/delete', adminAuthentified, userController.deleteOneUser);

// routes profil
router.get('/user/:id', userAuthentified, userController.oneUser);
router.patch('/user/:id', userAuthentified, userController.updateUser);

// traitement 404
router.use( (req, res) => {res.status(404).send('404')});

module.exports = router;