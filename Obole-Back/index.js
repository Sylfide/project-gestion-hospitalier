require('dotenv').config();
const cors=require('cors');
const express=require('express');
const PORT = process.env.PORT || 3000;
const app = express();

const formidableMiddleware = require("express-formidable");

 app.use(formidableMiddleware()); 
const bodyParser=require(("body-parser"));

// app.use(formidableMiddleware()); 
app.use(cors());
app.use(express.urlencoded({extended: true}));
 //app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));


const router = require('./app/router');
app.use(router);
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});