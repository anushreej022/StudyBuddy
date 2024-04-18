
const cloudinary = require('cloudinary').v2;
const path = require('path');
const { cloudinaryFolderConfig } = require('../config/cloudinary');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const uploadImageToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {

    // Read the file from disk

    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        reject(err);
      } else {

        // Upload the file to Cloudinary
        cloudinary.uploader.upload_stream(
          { folder: cloudinaryFolderConfig.imageFolder }, // Use image folder configuration
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(fileData);
      }
    });
  });
};

// Function to upload video to Cloudinary
const uploadVideoToCloudinary = (filePath) => {
    return new Promise((resolve, reject) => {
      // Read the file from disk
      fs.readFile(filePath, (err, fileData) => {
        if (err) {
          reject(err);
        } else {
          // Upload the file to Cloudinary
          cloudinary.uploader.upload_stream(
            { resource_type: 'video', folder: cloudinaryFolderConfig.videoFolder }, // Use image folder configuration

            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }

          ).end(fileData);
        }
      });
    });
};

module.exports = { uploadImageToCloudinary, uploadVideoToCloudinary };

