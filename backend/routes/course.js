const express = require('express');
const router = express.Router();
const { createCourse } = require('../controllers/course');
const { imageUpload, videoUpload } = require('../utils/cloudinaryUploader');

// Create a new course
router.post('/createCourse', imageUpload, videoUpload, createCourse);

module.exports = router;
