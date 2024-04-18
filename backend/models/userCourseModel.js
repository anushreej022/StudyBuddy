const mongoose = require("mongoose");

const userCourseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserCourse", userCourseSchema);
