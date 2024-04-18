import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  var regExEmail = /([\w\.]+)@northeastern\.edu/;
  var validEmail = false;

  $(function () {
    $("#email").on("keyup", function (e) {
      validationCheck(e, "email");
    });
  });

  const validationCheck = (e, idText) => {
    var value, type, em;
    value = e.target.value;
    type = idText;
    em = "error_" + type;

    switch (type) {
      case "email":
        if (!value.trim().match(regExEmail)) {
          document.getElementById(em).style.display = "block";
          validEmail = false;
        } else {
          document.getElementById(em).style.display = "none";
          validEmail = true;
        }
        break;
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    axios
      .post("http://localhost:5000/user/authenticate", {
        username: username,
        password: password,
      })
      .then((response) => {
        const { message, userType, token } = response.data;
        sessionStorage.setItem("token", token);
        if (userType === "Student") {
          navigate("/studentHome");
        } else {
          navigate("/instructorHome");
        }
      })
      .catch((error) => {
        alert("Invalid Credentials");
      });
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          id="email"
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

      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
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
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 outline-none"
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

      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
