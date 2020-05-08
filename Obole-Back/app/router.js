const express = require('express');

const router = express.Router();

// middlewares

const adminAuthentified = require('./middleware/isAdminAuthenticated');
const userAuthentified = require('./middleware/isUserAuthenticated');

// require des controllers
const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');
const roomController=require('./controllers/roomController');
const deceasedController=require('./controllers/deceasedController')
const embalmerController = require('./controllers/embalmerController');

// les routes
router.get('/', mainController.homePage);

// routes pour les users
router.post('/connection',mainController.connection);

// routes pour les admins / gestion des users
router.get('/user/list', adminAuthentified, userController.allUsers);
router.post('/user/new', adminAuthentified, userController.newUser);
router.delete('/user/:id/delete', adminAuthentified, userController.deleteOneUser);

// routes profil
router.get('/user/:id', userAuthentified, userController.oneUser);
router.patch('/user/:id', userAuthentified, userController.updateUser);

//routes pour les rooms 
router.post('/room/new',adminAuthentified,roomController.addRoom);
router.post('/room/modify/:id',adminAuthentified,roomController.modifyRoom);
router.get('/room/list',adminAuthentified,roomController.listRooms);
router.post('/room/details/:id',adminAuthentified,roomController.seeRoom);

//deceased routes
router.post('/deceased/entry',userAuthentified,deceasedController.enterDeceased);
router.post('/deceased/remove/:id',userAuthentified,deceasedController.removeDeceased);
// router.get('/deceased/list/current', userAuthentified, deceasedController);
// router.get('/deceased/list/history', userAuthentified, deceasedController);
// router.get('/deceased/:id', userAuthentified, deceasedController);
// router.patch('deceased/:id/update', userAuthentified, deceasedController);
// router.post('/deceased/:id/conservation/add', userAuthentified, deceasedController);
// router.patch('/deceased/:id/conservation/update', userAuthentified, deceasedController);
// router.post('/deceased/:id/deceased_ref/add', userAuthentified, deceasedController);
// router.patch('/deceased/:id/deceased_ref/update', userAuthentified, deceasedController);

// routes pour les thanato
router.get('/embalmer/list', userAuthentified, embalmerController.allEmbalmers);
router.get('/embalmer/:id', userAuthentified, embalmerController.oneEmbalmer);
router.post('/embalmer/new', userAuthentified, embalmerController.newEmbalmer);
router.patch('/embalmer/:id', userAuthentified, embalmerController.updateEmbalmer);
router.delete('/embalmer/:id/delete', userAuthentified, embalmerController.deleteOneEmbalmer);

// traitement 404
router.use( (req, res) => {res.status(404).send('404')});

module.exports = router;