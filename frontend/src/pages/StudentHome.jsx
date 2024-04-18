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

  // return (
  //   <div>
  //     <div className="image-grid">
  //       <Grid container spacing={4}>
  //         {courseArray.map((courses, index) => {
  //           const ratings = [3.5, 4.0, 4.5, 5.0];
  //           const randomIndex = Math.floor(Math.random() * ratings.length);
  //           const rating = ratings[randomIndex];
  //           const formattedRating = Number.isInteger(rating)
  //             ? rating.toFixed(1)
  //             : rating;

  //           const ratingCount = Math.floor(Math.random() * 51) + 30;
  //           const stars = [];
  //           for (let i = 0; i < rating; i++) {
  //             stars.push(<i className="fas fa-star" key={i}></i>);
  //           }
  //           if (rating % 1 !== 0) {
  //             stars.pop();
  //             stars.push(<i className="fas fa-star-half-alt" key={0.5}></i>);
  //           }
  //           return (
  //             <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
  //               <Card>
  //                 <CardMedia
  //                   component="img"
  //                   height="250"
  //                   src={courses.thumbnailUrl}
  //                   alt={courses.thumbnailUrl}
  //                   key={index}
  //                 />
  //                 <CardContent>
  //                   <Typography
  //                     gutterBottom
  //                     variant="h6"
  //                     component="h2"
  //                     style={{ fontWeight: "bold" }}
  //                   >
  //                     {courses.title}
  //                   </Typography>
  //                   <div className="rating-section">
  //                     <span className="rating-number">{formattedRating}</span>
  //                     <span className="rating-stars">{stars}</span>
  //                     <span className="ratings-count">
  //                       {ratingCount} Ratings
  //                     </span>
  //                   </div>
  //                   <div
  //                     style={{
  //                       display: "flex",
  //                       justifyContent: "space-between",
  //                       marginTop: "15px",
  //                     }}
  //                   >
  //                     <button
  //                       type="button"
  //                       className="btn btn-primary"
  //                       data-bs-toggle="modal"
  //                       data-bs-target={`#modal-${index}`}
  //                     >
  //                       Learn More
  //                     </button>
  //                     <StripeCheckout
  //                       stripeKey="pk_test_51P5hk306qocSO7qkMBikZUbyDyYR010PPqNdKLGJS3XQrwUyCoRmT0hVEAL1g3OXWhqOyaXTpc9EcyV56cyYxq9f00B8sUZv7N"
  //                       token={(token) => makePayment(token, courses.price)}
  //                       name="Buy"
  //                       className="btn-stripe-checkout"
  //                       style={{
  //                         backgroundColor: "#fff",
  //                         lineHeight: "38px",
  //                       }}
  //                       amount={parseInt(courses.price) * 100}
  //                       label={`Price: $${courses.price}`}
  //                     />
  //                   </div>
  //                 </CardContent>
  //               </Card>
  // <div
  //   className="modal fade"
  //   id={`modal-${index}`}
  //   tabIndex="-1"
  //   aria-labelledby={`modalLabel-${index}`}
  //   aria-hidden="true"
  // >
  //   <div className="modal-dialog">
  //     <div className="modal-content">
  //       <div className="modal-header">
  //         <h1 className="modal-title fs-5" id="exampleModalLabel">
  //           Learn More
  //         </h1>
  //         <button
  //           type="button"
  //           className="btn-close"
  //           data-bs-dismiss="modal"
  //           aria-label="Close"
  //         ></button>
  //       </div>
  //       <div className="modal-body">
  //         <h3>{courses.title}</h3>
  //         <p>{courses.description}</p>
  //       </div>
  //       <div className="modal-footer">
  //         <button
  //           type="button"
  //           className="btn btn-secondary"
  //           data-bs-dismiss="modal"
  //         >
  //           Close
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  //             </Grid>
  //           );
  //         })}
  //       </Grid>
  //     </div>
  //   </div>
  // );
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
