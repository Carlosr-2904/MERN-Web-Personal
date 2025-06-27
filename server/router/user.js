const express = require('express');
const UserController = require('../controllers/user');
const mdb_auth= require('../middlewares/authenticated');

const api = express.Router();

api.get('/user/me', [mdb_auth.asureAuth],UserController.getMe);


module.exports = api;
