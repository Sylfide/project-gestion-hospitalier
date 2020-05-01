const express = require('express');

const router = express.Router();

// middlewares

const adminAuthentified = require('./middleware/isAdminAuthenticated');
const userAuthentified = require('./middleware/isUserAuthenticated');

// require des controllers
const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');
const roomController=require('./controllers/roomController');

// les routes
router.get('/', mainController.homePage);

// routes pour les users
router.post('/connection',mainController.connection);

// routes pour les admins / gestion des users
router.get('/admin/user/list', adminAuthentified, userController.allUsers);
router.post('/admin/user/new', adminAuthentified, userController.newUser);
router.delete('/admin/user/:id/delete', adminAuthentified, userController.deleteOneUser);

// routes profil
router.get('/user/:id', userAuthentified, userController.oneUser);
router.patch('/user/:id', userAuthentified, userController.updateUser);

//routes pour les rooms 
router.post('/room/new',adminAuthentified,roomController.addRoom);
router.post('/room/modify/:id',adminAuthentified,roomController.modifyRoom);
router.get('/room/list',adminAuthentified,roomController.listRooms);
router.post('/room/details/:id',adminAuthentified,roomController.seeRoom)

// traitement 404
router.use( (req, res) => {res.status(404).render('404')});

module.exports = router;