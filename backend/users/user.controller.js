const User = require("../models/userModel");
const { genSaltSync, hashSync } = require("bcrypt");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserCourse = require("../models/userCourseModel");
const Course = require("../models/courseModel");
const { ObjectId } = require("mongoose").Types;

const {
  uploadImageToCloudinary,
  uploadVideoToCloudinary,
} = require("../utils/cloudinaryUploader");
var fs = require("fs-extra");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const stripe = require("stripe")(
//   "sk_test_51P5hk306qocSO7qkG9H0hnmstdO45LTGFW1jHldsQInFGnIpcs06HrkZpW2Lhrt0RZD9nEYhy0uk9WhkVdkqcgQp00NmWwXD6X"
// );
const { v4: uuidv4 } = require("uuid");

module.exports = {
  createCourse: async (req, res) => {
    try {
      const { title, description, price } = req.body;
      // Validation
      if (
        !title ||
        !description ||
        !price ||
        !req.files ||
        !req.files["thumbnail"] ||
        !req.files["video"]
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields, thumbnail, and video are required",
        });
      }

      const thumbnailDetails = await uploadImageToCloudinary(
        `uploads/${req.files["thumbnail"][0].originalname}`
      );

      const videoDetails = await uploadVideoToCloudinary(
        `uploads/${req.files["video"][0].originalname}`
      );

      const newCourse = await Course.create({
        title,
        description,
        thumbnailUrl: thumbnailDetails.secure_url,
        videoUrl: videoDetails.secure_url,
        price,
      });

      fs.unlink(`uploads/${req.files["thumbnail"][0].originalname}`);
      fs.unlink(`uploads/${req.files["video"][0].originalname}`);

      res.status(201).json({
        success: true,
        data: newCourse,
        message: "New course created successfully",
      });
    } catch (error) {
      console.error("Error while creating new course:", error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Error while creating new course",
      });
    }
  },
  createUser: async (req, res) => {
    try {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const { firstName, lastName, email, password, accountType } = body;
      console.log(firstName, lastName, email, password, accountType);

      if (await User.findOne({ email })) {
        return res.status(409).json({
          message: "User already exists",
        });
      }

      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        accountType,
      });

      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  authenticateUser: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ email: username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { userName: user.email, userType: user.accountType },
        "secret_key",
        {
          expiresIn: "1h",
        }
      );
      req.session.token = token;

      return res.status(200).json({
        message: "User Found",
        userType: user.accountType,
        token: token,
      });
    } else {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
  },
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find({}, { __v: 0 });
      return res.json(courses);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  processPayment: async (req, res) => {
    const { price, token } = req.body;
    const idempotencyKey = uuidv4();

    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create(
          {
            amount: price,
            currency: "usd",
            customer: customer.id,
          },
          { idempotencyKey }
        );
      })
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
  },

  saveUserCourse: async (req, res) => {
    try {
      const token = req.body.userToken;

      jwt.verify(token, "secret_key", (err, decoded) => {
        const username = decoded.userName;
        const courseId = req.body.courseId;
        const newUserCourse = new UserCourse({
          courseId,
          username,
        });
        newUserCourse.save();
        res.status(201).json({ message: "User Course created successfully" });
      });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getCourseByUsername: async (req, res) => {
    function verifyToken(token) {
      return new Promise((resolve, reject) => {
        jwt.verify(token, "secret_key", (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
    }

    try {
      const token = req.body.userToken;
      const decoded = await verifyToken(token);
      const username = decoded.userName;
      const userCourses = await UserCourse.find(
        { username },
        { __v: 0, _id: 0, username: 0 }
      );
      const promises = userCourses.map(async (course) => {
        const { courseId } = course;
        const courseIdObject = new ObjectId(courseId);
        const courses = await Course.findOne({ _id: courseIdObject });
        return courses;
      });
      const results = await Promise.all(promises);
      return res.json(results);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
