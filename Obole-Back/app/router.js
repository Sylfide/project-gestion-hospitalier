const express = require('express');

const router = express.Router();

// middlewares

const adminAuthentified=require('./middleware/isAdminAuthenticated');
const userAuthentified=require('./middleware/isUserAuthenticated');

// require des controllers
const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');
const roomController=require('./controllers/roomController');

// les routes
router.get('/', mainController.homePage);

// routes pour les users
router.get('/user/list', userController.allUsers);
router.get('/user/:id', userController.oneUser);
router.post('/connection',mainController.connection);
// router.post('/user/new', userController.newUser);

//routes pour les rooms 
router.post('/room/new',adminAuthentified,roomController.addRoom);

// traitement 404
router.use( (req, res) => {res.status(404).render('404')});

module.exports = router;