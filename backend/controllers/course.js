const Course = require('../models/course');
const Section = require('../models/section')
const SubSection = require('../models/subSection')

const { uploadImageToCloudinary, deleteResourceFromCloudinary } = require('../utils/imageUploader');
const { convertSecondsToDuration } = require("../utils/secToDuration")



// ================ create new course ================
exports.createCourse = async (req, res) => {
    try {
        // extract data
        let { courseName, courseDescription, price, 
            instructions: _instructions, status, tag: _tag } = req.body;

        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        // console.log("tag = ", tag)
        // console.log("instructions = ", instructions)

        // get thumbnail of course
        const thumbnail = req.files?.thumbnailImage;

        // validation
        if (!courseName || !courseDescription || !price 
            || !thumbnail || !instructions.length ) {
            return res.status(400).json({
                success: false,
                message: 'All Fileds are required'
            });
        }

        if (!status || status === undefined) {
            status = "Draft";
        }

        


        // upload thumbnail to cloudinary
        const thumbnailDetails = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create new course - entry in DB
        const newCourse = await Course.create({
            courseName, courseDescription, price, 
            tag, status, instructions, thumbnail: thumbnailDetails.secure_url, createdAt: Date.now(),
        });

        

        // return response
        res.status(200).json({
            success: true,
            data: newCourse,
            message: 'New Course created successfully'
        })
    }

    catch (error) {
        console.log('Error while creating new course');
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while creating new course'
        })
    }
}


// ================ show all courses ================
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({},
            {
                courseName: true, courseDescription: true, price: true, thumbnail: true
            })
            .exec();

        return res.status(200).json({
            success: true,
            data: allCourses,
            message: 'Data for all courses fetched successfully'
        });
    }

    catch (error) {
        console.log('Error while fetching data of all courses');
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while fetching data of all courses'
        })
    }
}



