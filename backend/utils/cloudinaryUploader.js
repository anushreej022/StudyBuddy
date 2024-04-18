const cloudinary = require("cloudinary").v2;
const path = require("path");
const { cloudinaryFolderConfig } = require("../config/cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImageToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        reject(err);
      } else {
        cloudinary.uploader
          .upload_stream(
            { folder: cloudinaryFolderConfig.imageFolder },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          )
          .end(fileData);
      }
    });
  });
};

const uploadVideoToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        reject(err);
      } else {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "video",
              folder: cloudinaryFolderConfig.videoFolder,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          )
          .end(fileData);
      }
    });
  });
};

module.exports = { uploadImageToCloudinary, uploadVideoToCloudinary };
