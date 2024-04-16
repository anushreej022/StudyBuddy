const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const { cloudinaryFolderConfig } = require('../config/cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Multer configuration for image uploads
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './frontend/public/backendImages');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multer configuration for video uploads
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './frontend/public/backendVideos');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize image upload
const imageUpload = multer({
  storage: imageStorage
}).single('image');

// Initialize video upload
const videoUpload = multer({
  storage: videoStorage
}).single('video');

// Function to upload image to Cloudinary
const uploadImageToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: cloudinaryFolderConfig.imageFolder }, // Use image folder configuration
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(file.buffer);
  });
};

// Function to upload video to Cloudinary
const uploadVideoToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: cloudinaryFolderConfig.videoFolder }, // Use video folder configuration
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(file.buffer);
  });
};

module.exports = { imageUpload, videoUpload, uploadImageToCloudinary, uploadVideoToCloudinary };
