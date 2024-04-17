import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import CourseService from '../services/courseService';

const CourseForm = ({ onSuccess }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    thumbnail: null,
    video: null,
    price: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };

  const handleThumbnailChange = (event) => {
    setCourseData({
      ...courseData,
      thumbnail: event.target.files[0]
    });
  };

  const handleVideoChange = (event) => {
    setCourseData({
      ...courseData,
      video: event.target.files[0]
    });
  };

  const handleSubmit = async () => {
    try {
        const formData = new FormData();

        // Append text data
        formData.append('title', courseData.title);
        formData.append('description', courseData.description);
        formData.append('price', courseData.price);
    
        // Append files
        if (courseData.thumbnail) {
          formData.append('thumbnail', courseData.thumbnail);
        }
        if (courseData.video) {
          formData.append('video', courseData.video);
        }
    
        // Send the request with Axios
        await CourseService.createCourse(formData);
      
      onSuccess(); // Call the success callback if the course is created successfully
      // Clear form fields if needed
    } catch (error) {
      console.error('Error creating course:', error);
      // Handle error
    }
  };

  return (
    <div>
      <TextField
        name="title"
        label="Title"
        value={courseData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="description"
        label="Description"
        value={courseData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <input
        type="file"
        onChange={handleThumbnailChange}
        required
      />
      <input
        type="file"
        onChange={handleVideoChange}
        required
      />
      <TextField
        name="price"
        type="number"
        label="Price"
        value={courseData.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Create Course
      </Button>
    </div>
  );
};

export default CourseForm;
