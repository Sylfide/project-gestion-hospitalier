const express = require('express');

const router = express.Router();

// require des controllers
const mainController = require('./controllers/mainController');

// les routes
router.get('/', mainController.homePage);
router.post('/connection',mainController.connection);

// traitement 404
router.use( (req, res) => {res.status(404).render('404')});

module.exports = router;