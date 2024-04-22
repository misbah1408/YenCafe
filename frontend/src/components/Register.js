import React, { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [credentials, setCredentials] = useState({
    name:"",
    email:"",
    password:"",
    location:""
  })
  const Navigate = useNavigate();
  const handelLogin = () => {
    Navigate("/login");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name:credentials.name,
        email:credentials.email,
        password:credentials.password,
        location:credentials.location
      }),
    });
    const json = await response.json()
    // console.log(json)
    if(json.message === "success"){
      Navigate("/login")
    }
    else{
      alert("Invalid Credentials")
    }
  };

  const handleOnChange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className="h-lvh w-[100%] bg-gradient-to-r from-[#44bd76] to-[#61cbcf]">
      <div className="absolute h-[40rem] w-[30rem] bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl">
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
                className="h-12 w-1/2 outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="text"
                placeholder="User name"
                name="name"
                value={credentials.name}
                onChange={handleOnChange}
              />
              <input
                className="h-12 w-1/2 @layer base outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="text"
                placeholder="Email"
                name="email"
                value={credentials.email}
                onChange={handleOnChange}
              />
              <input
                className="h-12 w-1/2 outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="password"
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={handleOnChange}
              />
              <select name="location" onChange={handleOnChange}>
                <option value="Balmatta 4th floor">Balmatta 4th floor</option>
                <option value="Balmatta 6th floor">Balmatta 6th floor</option>
              </select>
              <button
                className="h-12 w-1/2 bg-blue-600 text-white rounded-lg"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center gap-1 mt-2">
            <span
              onClick={handelLogin}
              className="text-blue-600 font-medium cursor-pointer"
            >
              Already Registered?
            </span>
            <button
              className="h-12 w-1/2 bg-blue-600 text-white rounded-lg"
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
