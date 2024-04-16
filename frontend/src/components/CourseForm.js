import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import CourseService from '../services/courseService';

const CourseForm = ({ onSuccess, onError }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('thumbnail', thumbnail);
      formData.append('video', video);
      formData.append('price', price);

      await CourseService.createCourse(formData);
      onSuccess();
      // Clear form fields if needed
    } catch (error) {
      console.error('Error creating course:', error);
      onError();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        type="file"
        label="Thumbnail"
        onChange={(e) => setThumbnail(e.target.files[0])}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        type="file"
        label="Video"
        onChange={(e) => setVideo(e.target.files[0])}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        type="number"
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Create Course
      </Button>
    </form>
  );
};

export default CourseForm;
