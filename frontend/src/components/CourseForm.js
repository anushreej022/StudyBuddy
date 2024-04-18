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
    <form
      className="flex flex-col gap-7"
    // onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[100%]">
          <label htmlFor="firstname" className="lable-style">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title"
            className="form-style"
            value={courseData.title}
            onChange={handleChange}
            required
          />
        </div>
       
        
        
      </div>
      <div className="flex flex-col gap-2 lg:w-[100%]">
          <label htmlFor="description" className="lable-style">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Enter Description"
            className="form-style"
            value={courseData.description}
            onChange={handleChange}
            required
          />
        </div>
      <div className="flex flex-row gap-2">
      <label htmlFor="thumbnail" className="lable-style">
            Thumbnail:
          </label>
           <input
        type="file"
        id="thumbnail"
        onChange={handleThumbnailChange}
        required
      />
       <label htmlFor="video" className="lable-style">
            Video:
          </label>
      <input
        type="file"
        id="video"
        onChange={handleVideoChange}
        required
      />
        </div>
        <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2 lg:w-[100%]">
          <label htmlFor="price" className="lable-style">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter Price"
            className="form-style"
            value={courseData.price}
            onChange={handleChange}
            required
          />
        </div>
      
        </div>
        <Button onClick={handleSubmit} variant="contained" color="primary">
         Create Course
       </Button>
    </form>




    // <div>
    //   <TextField
    //     name="title"
    //     label="Title"
    //     value={courseData.title}
    //     onChange={handleChange}
    //     fullWidth
    //     margin="normal"
    //     required
    //   />
    //   <TextField
    //     name="description"
    //     label="Description"
    //     value={courseData.description}
    //     onChange={handleChange}
    //     fullWidth
    //     margin="normal"
    //     required
    //   />
    //   <input
    //     type="file"
    //     onChange={handleThumbnailChange}
    //     required
    //   />
    //   <input
    //     type="file"
    //     onChange={handleVideoChange}
    //     required
    //   />
    //   <TextField
    //     name="price"
    //     type="number"
    //     label="Price"
    //     value={courseData.price}
    //     onChange={handleChange}
    //     fullWidth
    //     margin="normal"
    //     required
    //   />
    //   <Button onClick={handleSubmit} variant="contained" color="primary">
    //     Create Course
    //   </Button>
    // </div>
  );
};

export default CourseForm;
