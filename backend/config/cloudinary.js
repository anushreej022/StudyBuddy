const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log('Cloudinary connected successfully');
  } catch (error) {
    console.log(error);
  }
};

exports.cloudinaryFolderConfig = {
	imageFolder: 'StudyBuddy/Thumbnails', // Change the image folder name to "StudyBuddy/Thumbnails"
	videoFolder: 'StudyBuddy/Lectures', // Change the video folder name to "StudyBuddy/lecture videos"
  };
  