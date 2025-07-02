const express = require('express');
const {API_VERSION} =require('./constants');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Import routes
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const menuRoutes = require('./router/menu');
const courseRoutes = require('./router/course');

// Congfigure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Configure static files - folder
app.use(express.static("uploads"));

// Configure headers HTTP - CORS
app.use(cors());


// Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);

module.exports = app;