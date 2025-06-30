const express = require('express');
const multiparty = require('connect-multiparty');
const UserController = require('../controllers/user');
const mdb_auth= require('../middlewares/authenticated');

const md_upload = multiparty({uploadDir: './uploads/avatar'});
const api = express.Router();

api.get('/user/me', [mdb_auth.asureAuth],UserController.getMe);
api.get('/users', [mdb_auth.asureAuth], UserController.getUsers);
api.post('/user', [mdb_auth.asureAuth,  md_upload], UserController.createUser);
api.patch('/user/:id', [mdb_auth.asureAuth, md_upload], UserController.updateUser);


module.exports = api;
