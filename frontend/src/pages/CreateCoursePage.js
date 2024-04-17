import React from 'react';
import { Container, Typography } from '@mui/material';
import CourseForm from '../components/CourseForm';

const CreateCoursePage = () => {
  const handleSuccess = () => {
    window.alert('Course created successfully!');
    // Redirect to another page if needed
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Create a New Course
      </Typography>
      <CourseForm onSuccess={handleSuccess} />
    </Container>
  );
};

export default CreateCoursePage;
