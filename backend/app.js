const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/Study_Buddy";
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require('./config/cloudinary');
const app = express();
require('dotenv').config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
cloudinaryConnect();
const userRouter = require("./users/user.router");
app.use("/user", userRouter);

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDb");
    app.listen(5000, () => {
      console.log("Server Started!");
    });
  })
  .catch(() => console.log("Error connecting to MongoDb"));
