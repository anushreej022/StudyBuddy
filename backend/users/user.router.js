const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createUser,
  authenticateUser,
  getAllCourses,
  createCourse,
  processPayment,
} = require("./user.controller");

router.post("/create", createUser);
router.post("/authenticate", authenticateUser);
router.get("/getAllCourses", getAllCourses);
router.post("/payment", processPayment);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createCourse",
  upload.fields([{ name: "thumbnail" }, { name: "video" }]),
  createCourse
);
module.exports = router;
