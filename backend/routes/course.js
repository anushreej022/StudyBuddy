const express = require('express');
const router = express.Router();

// Import required controllers

// course controllers 
const {
    createCourse,
    getCourseDetails,
    getAllCourses,
    

} = require('../controllers/course')



// sections controllers
const {
    createSection,
    updateSection,
    deleteSection,
} = require('../controllers/section');


// subSections controllers
const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require('../controllers/subSection');


// Middlewares
const { auth } = require('../middleware/auth')


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************
// Courses can Only be Created by Instructors

router.post('/createCourse', auth, createCourse);

//Add a Section to a Course
router.post('/addSection', auth,  createSection);
// Update a Section
//router.post('/updateSection', auth, isInstructor, updateSection);
// Delete a Section
//router.post('/deleteSection', auth, isInstructor, deleteSection);

// Add a Sub Section to a Section
router.post('/addSubSection', auth, createSubSection);
// Edit Sub Section
//router.post('/updateSubSection', auth, isInstructor, updateSubSection);
// Delete Sub Section
//router.post('/deleteSubSection', auth, isInstructor, deleteSubSection);


// Get Details for a Specific Courses
//router.post('/getCourseDetails', getCourseDetails);
// Get all Courses
router.get('/getAllCourses', getAllCourses);
// get full course details
//router.post('/getFullCourseDetails', auth, getFullCourseDetails);
// Get all Courses Under a Specific Instructor
//router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)


// Edit Course routes
//router.post("/editCourse", auth, isInstructor, editCourse)

// Delete a Course
//router.delete("/deleteCourse", auth, isInstructor, deleteCourse)

// update Course Progress
//router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)


module.exports = router;