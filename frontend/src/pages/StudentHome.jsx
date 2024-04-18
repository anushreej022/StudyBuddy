import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import "./StudentHome.css";
import StripeCheckout from "react-stripe-checkout";
import { Link, useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// import {  Pagination } from "swiper"

import Course_Card from "../components/common/Course_Card"

const API_URL = "http://localhost:5000/user";




const StudentHome = () => {
  const navigate = useNavigate();
  const ratings = [3.5, 4.0, 4.5, 5.0];
  const [courseArray, setCourseArray] = useState([]);
  const makePayment = (token, price, id) => {
    axios
      .post(`${API_URL}/payment`, {
        token: token,
        price: parseInt(price) * 100,
      })
      .then((response) => {
        axios.post(`${API_URL}/userCourse`, {
          userToken: sessionStorage.getItem("token"),
          courseId: id,
        });
        alert("Payment successful!");
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/getAllCourses`)
      .then((res) => setCourseArray(res.data));
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("token") == null && sessionStorage.getItem("token") !== "Student") {
      navigate("/studentHome");
    }
  }, []);

  useEffect(() => {
    console.log(courseArray)
  })
  return (
    <>
      {courseArray?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          // modules={[ Pagination]}

          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem] pt-8 px-2"
        >
          {courseArray?.map((course, index) => (

            <SwiperSlide key={index}>
              <Course_Card course={course} index={index} Height={"h-[250px]"} Width={"w-[400px]"} stars={ratings[Math.floor(Math.random() * ratings.length)]} ratingCount={Math.floor(Math.random() * 51) + 30} />
              
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col sm:flex-row gap-6 ">
          <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
          <p className=" h-[201px] w-full rounded-xl hidden lg:flex skeleton"></p>
          <p className=" h-[201px] w-full rounded-xl hidden lg:flex skeleton"></p>
        </div>
      )}


    </>
  )

};

export default StudentHome;
