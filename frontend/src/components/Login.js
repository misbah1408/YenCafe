import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FETCH_URL } from "../utils/Constants";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email:"",
    password:"",
  })
  const Navigate = useNavigate()
  const handelRegister = () => {
    Navigate("/register")
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(`${FETCH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email:credentials.email,
        password:credentials.password,
      }),
    });
    const json = await response.json()
    // console.log(json.authToken)
    if(json.message === "success"){
      localStorage.setItem("authToken", json?.authToken);
      localStorage.setItem("isAdmin", json?.isAdmin?.isAdmin)
      Navigate("/")
    }
    else{
      alert("Invalid Credentials")
    }
  };

  const handleOnChange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className="h-dvh w-[100%] bg-gradient-to-r from-[#59c975] to-[#41c5c7]">
      <div className="absolute h-[32rem] w-[20rem] md:h-[35rem] md:w-[30rem] bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl">
        <div className="flex flex-col align-middle gap-3">
          <div className="flex flex-col items-center mt-6">
            <img className="h-[8rem]" src={logo} alt="" />
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
                className="md:h-12 md:w-1/2 @layer base outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="text"
                placeholder="Email"
                name="email"
                value={credentials.email}
                onChange={handleOnChange}
              />
              <input
                className="md:h-12 md:w-1/2 outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="password"
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={handleOnChange}
              />
              <button
                className="h-10 w-2/3 md:h-12 md:w-1/2 bg-blue-600 text-white rounded-lg"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
          <div className=" flex flex-col items-center gap-1">
              <Link className="text-blue-600 font-semibold md:text-md text-sm" to="/">
                <span>Forgot your password?</span>
              </Link>
              <button
                className="h-10 w-2/3 md:h-12 md:w-1/2 bg-blue-600 text-white rounded-lg"
                onClick={handelRegister}
              >
                Register
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
