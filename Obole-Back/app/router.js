const express = require('express');

const router = express.Router();

// require des controllers
const mainController = require('./controllers/mainController');

// les routes
router.get('/', mainController.homePage);

// traitement 404
router.use( (req, res) => {res.status(404).render('404')});

module.exports = router;