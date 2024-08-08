import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FETCH_URL } from "../utils/Constants";

export default function Register() {
  const [credentials, setCredentials] = useState({
    name:"",
    email:"",
    password:""
  })
  const [pasVis, setPasVis] = useState(false);
  const [error, setError] = useState("")
  const Navigate = useNavigate();
  const handelLogin = () => {
    Navigate("/login");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch(`${FETCH_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name:credentials.name.toLowerCase(),
        email:credentials.email,
        password:credentials.password
      }),
    });
    const json = await response.json()
    // console.log(json)
    if(json.message === "Existed Email" || "User Name already used"){
      setError(json.message)
    }
    if(json.message === "success"){
      Navigate("/login")
    }
  };

  const handleOnChange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
      // console.log(credentials.location)
  }
  return (
    <div className="h-dvh w-[100%] bg-gradient-to-r from-[#59c975] to-[#41c5c7]">
      <div className="absolute h-[32rem] w-[20rem] md:h-[38rem] md:w-[30rem] bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl">
        <div className="flex flex-col align-middle gap-3">
          <div className="flex flex-col items-center mt-6">
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
                type="text"
                placeholder="User name"
                name="name"
                value={credentials.name}
                onChange={handleOnChange}
              />
              {error === "User Name already used" ? <span className="text-[12px] text-red-700 text-start">Username already used</span> : null}
              <input
                className="md:h-12 md:w-1/2 @layer base outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="text"
                placeholder="Email"
                name="email"
                value={credentials.email}
                onChange={handleOnChange}
              />
              {error === "Existed Email" ? <span className="text-[12px] text-red-700 text-start">Existed Email</span> : null}

              <div className="md:h-12 md:w-1/2 flex items-center justify-center">
                <input
                  className="w-[70%] h-[40px] md:w-[85%] outline-none px-6 py-2 bg-gray-100 rounded-l-md"
                  type={pasVis ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleOnChange}
                />
                <div className="w-15% h-[40px] md:w-[15%] outline-none  bg-gray-100 rounded-r-md" onClick={()=> setPasVis((pre) => !pre)}>
                {pasVis ? (
                  <i className="fa-solid fa-eye-slash text-gray-500 pr-5 pt-3"></i>
                ) : (
                  <i className="fa-solid fa-eye text-gray-500 pr-[22px] pt-3"></i>
                )}
                </div>
              </div>
              {/* <select
                name="location"
                value={credentials.location}
                onChange={handleOnChange}
                className="md:h-12 md:w-1/2 outline-none px-6 py-2 bg-gray-100 rounded-md"
              >
                <option value="Balmatta 4th floor">Balmatta 4th floor</option>
                <option value="Balmatta 6th floor">Balmatta 6th floor</option>
              </select> */}
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
              onClick={handelLogin}
              className="text-blue-600 font-medium cursor-pointer text-sm md:text-md"
            >
              <Link to='/login'>Already Registered?</Link>
            </span>
            <button
              className="h-10 w-[65%] md:h-12 md:w-1/2 bg-blue-600 text-white rounded-lg"
              onClick={handelLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
