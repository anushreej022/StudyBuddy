import React, { useEffect, useState } from "react"
// Icons
// import { FaRegStar, FaStar } from "react-icons/fa"
// import ReactStars from "react-rating-stars-component"
import { Link } from "react-router-dom"

// import Img from './../../common/Img';
import RatingStars from "./RatingStars";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";


import Img from "./Img";

const API_URL = "http://localhost:5000/user";
function Enrolled_Course_Card({ course, index, Height, Width, stars, ratingCount }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const toggleModal = () => setModalIsOpen(!modalIsOpen);
    const ratings = [3.5, 4.0, 4.5, 5.0];
    // const avgReviewCount = GetAvgRating(course.ratingAndReviews)
    // console.log(course.ratingAndReviews)
    //   const [avgReviewCount, setAvgReviewCount] = useState(0)
    //   useEffect(() => {
    //     const count = GetAvgRating(course.ratingAndReviews)
    //     setAvgReviewCount(count)
    //   }, [course])
    // console.log("count............", avgReviewCount)
    const makePayment = (token, price) => {
        axios
            .post(`${API_URL}/payment`, {
                token: token,
                price: parseInt(price) * 100,
            })
            .then((response) => {
                alert("Payment successful!");
            });
        // .then((response) => {
        //   axios.post("http://localhost:5000/user/userCourse", {
        //     token: sessionStorage.getItem("token"),
        //     courseId: props.id,
        //   });
        // });
    };
    return (
        <div className='hover:scale-[1.03] transition-all duration-200 z-50 '>
            <div className="">
                {/* <div className="rounded-lg">
                    <Img
                        src={course?.thumbnailUrl}
                        alt="course thumnail"
                        className={`${Height} ${Width}  rounded-xl object-cover `}
                    />
                </div> */}
                <div className="rounded-lg">
                    <video
                        src={course.videoUrl}
                        alt="course video"
                        className={`${Height} ${Width} rounded-xl object-cover`}
                        controls
                        style={{
                            width: '100%', // Use '100%' to fill the width of its container
                            height: '100%', // Use '100%' to fill the height of its container
                            objectFit: 'cover', // Ensures the video covers the full area, potentially cropping it
                            borderRadius: '15px' // If you want rounded corners
                        }}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">{course?.title}</p>
                    {/* <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p> */}
                    <div className="flex items-center gap-2">
                        {/* <ReactStars
                count={5}
                value={avgReviewCount || 0}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaRegStar />}
                fullIcon={<FaStar />}
              /> */}
                      
                        <span className="text-richblack-400">
                            {course.description}
                        </span>
                    </div>
                    {/* <p className="text-xl text-richblack-5">Rs. {course?.price}</p> */}
                    {/* <div className="d-flex justify-content-between">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal-${index}`}
                        >
                            Learn More
                        </button>
                        <StripeCheckout
                            stripeKey="pk_test_51P5hk306qocSO7qkMBikZUbyDyYR010PPqNdKLGJS3XQrwUyCoRmT0hVEAL1g3OXWhqOyaXTpc9EcyV56cyYxq9f00B8sUZv7N"
                            token={(token) => makePayment(token, course.price)}
                            name="Buy"
                            className="btn-stripe-checkout"
                            style={{
                                backgroundColor: "#fff",
                                lineHeight: "38px",
                            }}
                            amount={parseInt(course.price) * 100}
                            label={`Price: $${course.price}`}
                        />
                    </div> */}
                </div>
            </div>
            <div
                className="modal fade"
                id={`modal-${index}`}
                tabIndex="-1"
                aria-labelledby={`modalLabel-${index}`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Learn More
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Enrolled_Course_Card