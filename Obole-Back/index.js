require('dotenv').config();
const cors=require('cors');

const express=require('express');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

const formidableMiddleware = require("express-formidable");

app.use(formidableMiddleware()); 

app.use(express.urlencoded({extended: true}));

const router = require('./app/router');
app.use(router);


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});