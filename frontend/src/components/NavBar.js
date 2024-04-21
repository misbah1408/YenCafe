import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="h-20 flex items-center justify-around shadow-sm shadow-gray-300">
      <a href="/">
        <div className="flex items-center gap-3">
          <img className="h-16" src={logo} alt="" />
          <span className="text-xl font-bold text-gray-800">YenCafe</span>
        </div>
      </a>
      <div className="flex gap-5 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? " text-blue-600 font-semibold" : " "
          }
        >
          <span className=" text-lg ">Home</span>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? " text-blue-600 font-semibold" : " "
          }
        >
          <span>About</span>
        </NavLink>
        <div className="flex items-center">
          <input
            className="h-9 w-[20rem] outline-none border-[1.6px] border-gray-400 px-3 py-3 rounded-l-xl border-r-white"
            type="text"
            placeholder="Search"
          />{" "}
          <i class="fa-solid fa-magnifying-glass bg-gray-100 h-9 w-12 p-2 pl-4 text-blue-600 border-[2px] border-gray-400 rounded-r-xl"></i>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <i class="fa-solid fa-cart-shopping text-xl text-gray-700"></i>
        <button
          className="bg-blue-600 text-white px-5 py-1 rounded-lg "
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
