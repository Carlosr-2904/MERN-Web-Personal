const express = require('express');
const MenuController = require('../controllers/menu');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

//Endpoints


module.exports=api