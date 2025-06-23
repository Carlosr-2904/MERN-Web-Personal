const express = require('express');
const {API_VERSION} =require('./constants');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Import routes
//...

// Congfigure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Configure static files - folder
app.use(express.static("uploads"));

// Configure headers HTTP - CORS
app.use(cors());


// Configure routes
//...

module.exports = app;