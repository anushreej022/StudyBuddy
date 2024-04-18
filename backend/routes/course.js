const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createCourse } = require('../controllers/course');
const { imageUpload, videoUpload } = require('../utils/cloudinaryUploader');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });    
// Create a new course
router.post('/createCourse', upload.fields([{ name: 'thumbnail'}, { name: 'video', maxCount: 1 }]), createCourse);

module.exports = router;
