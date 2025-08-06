const express = require('express');
const PostController = require('../controllers/post');
const md_auth = require('../middlewares/authenticated');
const multiparty = require('connect-multiparty');
const md_upload = multiparty({ uploadDir: './uploads/blog' });
const api = express.Router();

api.post('/post', [md_auth.asureAuth, md_upload], PostController.createPost);

module.exports = api;