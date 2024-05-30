import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FETCH_URL } from "../utils/Constants";
import logo from "../images/logo.png";

export default function ForgotPassword() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${FETCH_URL}/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);

    if (json.message === "Invalid Email") {
      setError("Invalid Email");
      setMessage("");
    } else if (json.message === "Password is required") {
      setError("Password is required");
      setMessage("");
    } else if (json.message === "Password updated successfully") {
      setMessage("Password has been updated successfully");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError("An error occurred. Please try again.");
      setMessage("");
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-dvh w-[100%] bg-gradient-to-r from-[#59c975] to-[#41c5c7]">
      <div className="absolute h-[32rem] w-[20rem] md:h-[35rem] md:w-[30rem] bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl">
        <div className="flex flex-col align-middle gap-3">
          <div className="flex flex-col items-center mt-6">
            <img className="h-[8rem]" src={logo} alt="Logo" />
            <p className="flex flex-col items-center">
              <span className="font-bold text-xl">YENEPOYA</span>
              <span className="font-semibold">(Deemed to be University)</span>
            </p>
          </div>
          <div className="mt-5">
            <form
              className="flex flex-col items-center gap-3"
              onSubmit={handleSubmit}
            >
              <input
                className="md:h-12 md:w-1/2 outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="email"
                placeholder="Email"
                name="email"
                value={credentials.email}
                onChange={handleOnChange}
              />
              {error === "Invalid Email" && (
                <span className="text-[12px] text-red-700 text-start">
                  Invalid Email
                </span>
              )}
              <input
                className="md:h-12 md:w-1/2 outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="password"
                placeholder="Enter New Password"
                name="password"
                value={credentials.password}
                onChange={handleOnChange}
              />
              {error === "Password is required" && (
                <span className="text-[12px] text-red-700 text-start">
                  Password is required
                </span>
              )}
              <button
                className="h-10 w-2/3 md:h-12 md:w-1/2 bg-blue-600 text-white rounded-lg"
                type="submit"
              >
                Update Password
              </button>
              {message && (
                <span className="text-[12px] text-green-700 text-start">
                  {message}
                </span>
              )}
            </form>
          </div>
          <div className="flex flex-col items-center gap-1">
            <button
              className="h-10 w-2/3 md:h-12 md:w-1/2 bg-blue-600 text-white rounded-lg"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
