import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FETCH_URL } from "../utils/Constants";

export default function Register() {
  const [credentials, setCredentials] = useState({
    campusId: "",
    email: "",
    password: ""
  });
  const [pasVis, setPasVis] = useState(false);
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleLogin = () => {
    Navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${FETCH_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campusId: credentials.campusId,
          email: credentials.email.toLowerCase(),
          password: credentials.password
        }),
      });
      const json = await response.json();
      if (json.message === "Existed Email" || json.message === "Campus Id already used") {
        setError(json.message);
      } else if (json.message === "success") {
        Navigate("/login");
      }
    } catch (err) {
      console.error("Network error: ", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  };

  return (
    <div className="h-dvh w-[100%] bg-gradient-to-r from-[#59c975] to-[#41c5c7]">
      <div className="absolute h-max-h-max w-[20rem] md:max-h-max md:w-[30rem] bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl">
        <div className="flex flex-col align-middle gap-3 py-7">
          <div className="flex flex-col items-center mt-1">
            <img className="h-24 md:h-[8rem]" src={logo} alt="" />
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
                type="number"
                placeholder="Campus Id"
                name="campusId"
                value={credentials.campusId}
                onChange={handleOnChange}
                required
              />
              {error === "Campus Id already used" && <span className="text-[12px] text-red-700 text-start">Campus Id already used</span>}
              <input
                className="md:h-12 md:w-1/2 @layer base outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="text"
                placeholder="Email"
                name="email"
                value={credentials.email}
                onChange={handleOnChange}
                required
              />
              {error === "Existed Email" && <span className="text-[12px] text-red-700 text-start">Existed Email</span>}

              <div className="relative md:h-12 md:w-1/2">
                <input
                  className="w-full @layer base outline-none px-6 py-2 bg-gray-100 rounded-md"
                  type={pasVis ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleOnChange}
                  required
                />
                <div className="absolute inset-y-2 right-3" onClick={() => setPasVis((pre) => !pre)}>
                  {pasVis ? (
                    <i className="fa-solid fa-eye-slash text-gray-500 "></i>
                  ) : (
                    <i className="fa-solid fa-eye text-gray-500 "></i>
                  )}
                </div>
              </div>
              <button
                className="h-10 w-[65%] md:h-12 md:w-1/2 bg-blue-600 text-white rounded-lg"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center gap-1 mt-2">
            <span
              onClick={handleLogin}
              className="text-blue-600 font-medium cursor-pointer text-sm md:text-md"
            >
              <Link to='/login'>Already Registered?</Link>
            </span>
            <button
              className="h-10 w-[65%] md:h-12 md:w-1/2 bg-blue-600 text-white rounded-lg"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
