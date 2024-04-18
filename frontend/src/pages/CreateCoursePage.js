import React from 'react';
import { Container, Typography } from '@mui/material';
import CourseForm from '../components/CourseForm';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateCoursePage = () => {
  const handleSuccess = () => {
    window.alert('Course created successfully!');
    // Redirect to another page if needed
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token") == null || sessionStorage.getItem("token") === "Student") {
      navigate("/");
    }
  }, []);

  // return (
  //   // <Container>
  //   //   <Typography variant="h4" align="center" gutterBottom>
  //   //     Create a New Course
  //   //   </Typography>
  //   //   <CourseForm onSuccess={handleSuccess} />
  //   // </Container>

  return (
    <div class="flex justify-center items-center min-h-screen">
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col lg:w-[60%]">
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Add a new Course here
      </h1>
      {/* <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
      </p> */}

      <div className="mt-7">
        <CourseForm />
      </div>
    </div>
    </div>
  );
};


export default CreateCoursePage;
