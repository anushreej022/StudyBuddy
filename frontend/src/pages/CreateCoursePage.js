import React from 'react';
import { Container, Typography } from '@mui/material';
import CourseForm from '../components/CourseForm';

const CreateCoursePage = () => {
  const handleSuccess = () => {
    window.alert('Course created successfully!');
    // Redirect to another page if needed
  };

  const handleError = () => {
    window.alert('Error creating course. Please try again.');
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Create a New Course
      </Typography>
      <CourseForm onSuccess={handleSuccess} onError={handleError} />
    </Container>
  );
};

export default CreateCoursePage;
