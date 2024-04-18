const Course = require('../models/course');
const { uploadImageToCloudinary, uploadVideoToCloudinary } = require('../utils/cloudinaryUploader');
var fs = require('fs-extra');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    // Validation
    if (!title || !description || !price || !req.files || !req.files['thumbnail'] || !req.files['video']){
      return res.status(400).json({
        success: false,
        message: 'All fields, thumbnail, and video are required',
      });
    }

    // Upload thumbnail to Cloudinary
    const thumbnailDetails = await uploadImageToCloudinary(`uploads/${req.files['thumbnail'][0].originalname}`);

    // Upload video to Cloudinary
    const videoDetails = await uploadVideoToCloudinary(`uploads/${req.files['video'][0].originalname}`);

    // Create new course
    const newCourse = await Course.create({
      title,
      description,
      thumbnailUrl: thumbnailDetails.secure_url,
      videoUrl: videoDetails.secure_url,
      price,
    });

    fs.unlink(`uploads/${req.files['thumbnail'][0].originalname}`);
    fs.unlink(`uploads/${req.files['video'][0].originalname}`);

    res.status(201).json({
      success: true,
      data: newCourse,
      message: 'New course created successfully',
    });
  } catch (error) {
    console.error('Error while creating new course:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error while creating new course',
    });
  }
};
