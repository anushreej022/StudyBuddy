import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/v1/course';
const API_URL = "http://localhost:5000/user";

const CourseService = {
  createCourse: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/createCourse`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',

        },
      });
      console.log('New course created:', response.data);
      // Handle success (e.g., redirect to another page or show success message)
    } catch (error) {
      console.error('Error creating course:', error);
      // Handle error (e.g., show error message)
    }
  },
};

export default CourseService;
