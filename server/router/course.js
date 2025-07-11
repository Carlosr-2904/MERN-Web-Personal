const express = require('express');
const multiparty = require('connect-multiparty');
const courseController = require('../controllers/course');
const md_auth = require('../middlewares/authenticated');

const md_upload = multiparty({ uploadDir: './uploads/course' });
const api = express.Router();

//APIs ...
api.post('/course', [md_auth.asureAuth, md_upload], courseController.createCourse);
api.get('/course', courseController.getCourse);

module.exports = api;