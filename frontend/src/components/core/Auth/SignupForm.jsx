import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";
import $ from "jquery";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  var regExEmail = /([\w\.]+)@northeastern\.edu/;
  const regExName = /^[a-zA-Z\s'-]+$/;

  var validEmail = true;
  var validPassword = true;
  var validConfirmPassword = true;
  var validFirstName = true;
  var validLastName = true;
  var regExPassword1 = /(?=.*[0-9])/;
  var regExPassword2 = /(?=.*[!@#$%^&*])/;

  $(function () {
    $("input#email").on("keyup", function (e) {
      validationCheck(e, "email");
    });

    $("input#password").on("keyup", function (e) {
      validationCheck(e, "password");
    });

    $("input#confirmPassword").on("keyup", function (e) {
      validationCheck(e, "confirmPassword");
    });

    $("input#firstName").on("keyup", function (e) {
      validationCheck(e, "firstName");
    });

    $("input#lastName").on("keyup", function (e) {
      validationCheck(e, "lastName");
    });
  });

  const validationCheck = (e, idText) => {
    var value, type, em;
    value = e.target.value;
    type = idText;
    em = "error_" + type;

    switch (type) {
      case "firstName":
        if (!regExName.test(value)) {
          document.getElementById(em).style.display = "block";
          validFirstName = false;
        } else {
          document.getElementById(em).style.display = "none";
          validFirstName = true;
        }
        break;
      case "lastName":
        if (!regExName.test(value)) {
          document.getElementById(em).style.display = "block";
          validLastName = false;
        } else {
          document.getElementById(em).style.display = "none";
          validLastName = true;
        }
        break;
      case "email":
        if (!value.trim().match(regExEmail)) {
          document.getElementById(em).style.display = "block";
          validEmail = false;
        } else {
          document.getElementById(em).style.display = "none";
          validEmail = true;
        }
        break;

      case "password":
        if (value.length < 8) {
          $("#" + em).show();
          validPassword = false;
        } else if (!value.match(regExPassword1)) {
          $("#" + em).html("1 number needed");
          $("#" + em).show();
          validPassword = false;
        } else if (!value.match(regExPassword2)) {
          $("#" + em).html("1 special character needed");
          $("#" + em).show();
          validPassword = false;
        } else {
          $("#" + em).hide();
          validPassword = true;
          if (value == $("#confirmPassword").val()) {
            $("#error_confirmPassword").hide();
            validConfirmPassword = true;
          } else {
            $("#error_confirmPassword").show();
            validConfirmPassword = false;
          }
        }
        break;

      case "confirmPassword":
        if ($("#password").val() != value) {
          $("#" + em).show();
          validConfirmPassword = false;
        } else {
          $("#" + em).hide();
          validConfirmPassword = true;
        }
        break;
    }
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const signupData = {
      ...formData,
      accountType,
    };

    console.log(validEmail);
    console.log(validPassword);
    console.log(validConfirmPassword);
    console.log(validFirstName);
    console.log(validLastName);

    if (
      validEmail &&
      validConfirmPassword &&
      validPassword &&
      validFirstName &&
      validLastName
    ) {
      axios
        .post("http://localhost:5000/user/create", signupData)
        .then((response) => {
          dispatch(setSignupData(signupData));
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setAccountType(ACCOUNT_TYPE.STUDENT);
          $("#error_confirmPassword").hide();
          $("#error_password").hide();
          $("#error_email").hide();
          $("#error_firstName").hide();
          $("#error_lastName").hide();
          navigate("/login");
        })
        .catch((error) => alert("Username Exists!"));
    }
  };

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <div className="relativename">
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                First Name <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
              />
            </label>
            <div id="error_firstName" style={{ display: "none", color: "red" }}>
              No special characters
            </div>
          </div>

          <div className="relativename">
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Last Name <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
              />
            </label>
            <div id="error_lastName" style={{ display: "none", color: "red" }}>
              No special characters
            </div>
          </div>
        </div>

        {/* Email Address */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
          />
        </label>

        <div id="error_email" style={{ display: "none", color: "red" }}>
          Please enter valid email address.
        </div>

        <div className="flex gap-x-4">
          <div className="relativepassword">
            {/* Create Password */}
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Create Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <div id="error_password" style={{ display: "none", color: "red" }}>
              Should be 8 characters
            </div>
          </div>

          {/* Confirm Password  */}
          <div className="relativepassword">
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>{" "}
            <div
              id="error_confirmPassword"
              style={{ display: "none", color: "red" }}
            >
              Passwords don't match
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
