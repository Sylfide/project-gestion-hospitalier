const express = require('express');

const router = express.Router();

// require des controllers
const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');

// les routes
router.get('/', mainController.homePage);

// routes pour les users
router.get('/user/list', userController.allUsers);
router.get('/user/:id', userController.oneUser);
// router.post('/user/new', userController.newUser);

// traitement 404
router.use( (req, res) => {res.status(404).render('404')});

module.exports = router;