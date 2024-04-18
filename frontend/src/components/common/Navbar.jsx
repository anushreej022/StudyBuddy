import React, { useState, useEffect } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import StudyBuddyLogo from '../../assets/Logo/Logo-Full-Light.png'
import { fetchCourseCategories } from './../../services/operations/courseDetailsAPI';
import { AiOutlineShoppingCart } from "react-icons/ai"
import { MdKeyboardArrowDown } from "react-icons/md"
import { NavbarLinks } from "../../data/navbar-links"
import {  useNavigate } from "react-router-dom";


const Navbar = () => {
    // console.log("Printing base url: ", import.meta.env.VITE_APP_BASE_URL);
    const [token, setToken] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        console.log("HITTT", token)
        setToken(sessionStorage.getItem("token"));
    }, [token])
    // const { token } = sessionStorage.getItem("token")
    const { user } = useSelector((state) => state.profile);
    // console.log('USER data from Navbar (store) = ', user)
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchSublinks = async () => {
        
        try {
            setLoading(true)
            const res = await fetchCourseCategories();
            // const result = await apiConnector("GET", categories.CATEGORIES_API);
            // const result = await apiConnector('GET', 'http://localhost:4000/api/v1/course/showAllCategories');
            // console.log("Printing Sublinks result:", result);
            setSubLinks(res);
        }
        catch (error) {
            console.log("Could not fetch the category list = ", error);
        }
        setLoading(false)
    }

    // console.log('data of store  = ', useSelector((state)=> state))


    useEffect(() => {
        fetchSublinks();
    }, [])


    // when user click Navbar link then it will hold yellow color
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    const logOut = () => {
        sessionStorage.removeItem("token");
    sessionStorage.removeItem("userType");
        navigate("/");
        window.location.reload();
    };
    


    // when user scroll down , we will hide navbar , and if suddenly scroll up , we will show navbar 
    const [showNavbar, setShowNavbar] = useState('top');
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        }
    })

    // control Navbar
    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY)
                setShowNavbar('hide')

            else setShowNavbar('show')
        }

        else setShowNavbar('top')

        setLastScrollY(window.scrollY);
    }



    return (
        <nav className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 text-white translate-y-0 transition-all ${showNavbar} `}>
            {/* <nav className={` fixed flex items-center justify-center w-full h-16 z-[10] translate-y-0 transition-all text-white ${showNavbar}`}> */}
            <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
                {/* logo */}
                <Link to="/">
                    <img src={StudyBuddyLogo} width={160} height={42} loading='lazy' />
                </Link>

                {/* Nav Links - visible for only large devices*/}
               
                <ul className='hidden sm:flex gap-x-6 text-richblack-25'>
                    <li>
                    <Link to={"/"}>
                                            <p className={`${matchRoute("/") ? "bg-yellow-25 text-black" : "text-richblack-25"} rounded-xl p-1 px-3 `}>
                                                Home
                                            </p>
                                        </Link>
                    </li>
                    <li>
                    <Link to={"/about"}>
                                            <p className={`${matchRoute("/about") ? "bg-yellow-25 text-black" : "text-richblack-25"} rounded-xl p-1 px-3 `}>
                                                About Us
                                            </p>
                                        </Link>
                    </li>
                    <li>
                    <Link to={"/contact"}>
                                            <p className={`${matchRoute("/contact") ? "bg-yellow-25 text-black" : "text-richblack-25"} rounded-xl p-1 px-3 `}>
                                                Contact Us
                                            </p>
                                        </Link>
                    </li>
                    </ul>



                {/* Login/SignUp/Dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart className="text-[2.35rem] text-richblack-5 hover:bg-richblack-700 rounded-full p-2 duration-200" />
                                {totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )
                    }
                    {
                        token == null && (
                            <Link to="/login">
                                {/* <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md focus:outline-8 outline-yellow-50'> */}
                                <button className={` px-[12px] py-[8px] text-richblack-100 rounded-md 
                                 ${matchRoute('/login') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'} `}
                                >
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                {/* <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'> */}
                                <button className={` px-[12px] py-[8px] text-richblack-100 rounded-md 
                                 ${matchRoute('/signup') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'} `}
                                >
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }

{
                        token !== null && (
                            <Link to="/profile">
                                {/* <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md focus:outline-8 outline-yellow-50'> */}
                                <button className={` px-[12px] py-[8px] text-richblack-100 rounded-md 
                                 ${matchRoute('/profile') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'} `}
                                >
                                    Profile
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <Link to="/">
                                {/* <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'> */}
                                <button onClick={logOut} className={` px-[12px] py-[8px] text-richblack-100 rounded-md 
                                 ${matchRoute('/') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'} `}
                                >
                                    Log Out
                                </button>
                            </Link>
                        )
                    }

                    {/* for large devices */}
                    {/* {token !== null && <ProfileDropDown />} */}

                    {/* for small devices */}
                    {/* {token !== null && <MobileProfileDropDown />} */}

                </div>
            </div>
        </nav>
    )
}

export default Navbar
