import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Course_Card from "../components/common/Course_Card";
import Enrolled_Course_Card from "../components/common/Enrolled_Course_Card";

const API_URL = "http://localhost:5000/user";


export default function Profile() {
    const [token, setToken] = useState(null);
    const ratings = [3.5, 4.0, 4.5, 5.0];
    const navigate = useNavigate();
    useEffect(() => {
        console.log("HITTT", token)
        setToken(sessionStorage.getItem("token"));
    }, [token])
    useEffect(() => {
        if (sessionStorage.getItem("token") == null && sessionStorage.getItem("token") !== "Student") {
          navigate("/");
        }
      }, []);
      const [courseArray, setCourseArray] = useState([]);
      // useEffect(() => {
      //   axios
      //     .get(`${API_URL}/getAllCourses`)
      //     .then((res) => setCourseArray(res.data));
      // }, []);
  
      useEffect(() => {
        axios
          .post(`${API_URL}/getCourseByUsername`, {userToken: sessionStorage.getItem("token")})
          .then((res) => setCourseArray(res.data));
      }, []);

      useEffect(() => {
        console.log("HELO",courseArray);
      }, []);
    return (
        <>     
          <div className="mt-4 text-4xl text-richblack-5 font-boogaloo text-center sm:text-left">Enrolled Courses</div>
          {courseArray?.length ? (
  <div className="grid grid-cols-3 gap-4 pt-8 px-2">
    {courseArray.slice(0, 12).map((course, index) => (
      <div key={index} className="flex flex-col items-center justify-center min-h-[250px] w-full  shadow-md rounded-lg p-4">
        <Enrolled_Course_Card
        Height={"h-[400px]"} Width={"w-[600px]"}
          course={course}
          index={index}
          stars={ratings[Math.floor(Math.random() * ratings.length)]}
          ratingCount={Math.floor(Math.random() * 51) + 30}
        />
      </div>
    ))}
  </div>
) : (
  <p>No courses available.</p>
)}


        </>
    

    )
}