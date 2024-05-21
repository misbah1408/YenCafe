import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useCart } from "./store/ContextReducer";

export default function NavBar() {
  const [cartValue, setCartValue] = useState(0);
  const navigate = useNavigate();
  const cart = useCart();
  // console.log(cart)
  // console.log(localStorage.getItem("authToken"))
  useEffect(() => {
    setCartValue(cart.length);
  }, [cart]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <div className="h-20 flex items-center justify-around shadow-sm shadow-gray-300">
      <a href="/">
        <div className="flex items-center gap-3">
          <img className="h-16" src={logo} alt="YenCafe Logo" />
          <span className="text-xl font-bold text-gray-800">YenCafe</span>
        </div>
      </a>
      <div className="flex gap-5 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? " text-blue-600 font-semibold" : ""
          }
        >
          <span className=" text-lg hover:bg-blue-100 px-3 py-2 rounded-xl">
            Home
          </span>
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? " text-blue-600 font-semibold" : ""
          }
        >
          <span className="text-lg hover:bg-blue-100 px-3 py-2 rounded-xl">
            Menu
          </span>
        </NavLink>
        <NavLink
          to="/myorder"
          className={({ isActive }) =>
            isActive ? " text-blue-600 font-semibold" : ""
          }
        >
          <span className=" text-lg hover:bg-blue-100 px-3 py-2 rounded-xl">
            Your Order
          </span>
        </NavLink>
        <div className="flex items-center">
          <input
            className="h-9 w-[20rem] outline-none border-[1.6px] border-gray-200 px-3 py-3 rounded-l-xl border-r-white"
            type="text"
            placeholder="Search"
          />
          <i className="fa-solid fa-magnifying-glass bg-gray-100 h-9 w-12 p-2 pl-4 text-blue-600 border-[2px] border-gray-200 rounded-r-xl"></i>
        </div>
      </div>
      {localStorage.getItem("authToken") ? (
        <div className="flex items-center gap-10">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? " rounded-full font-semibold" : ""
            }
          >
            <div className="relative">
              <i className="fa-solid fa-cart-shopping text-2xl text-gray-700 px-3 py-2 hover:bg-blue-100 rounded-full"></i>
              {cartValue > 0 && (
                <span className="absolute left-5 text-blue-600 text-sm font-bold -top-3 px-3 py-2 rounded-full">
                  {cartValue}
                </span>
              )}
            </div>
          </NavLink>
          <button
            className="bg-blue-600 text-white px-5 py-1 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-10">
          <button
            className="bg-blue-600 text-white px-5 py-1 rounded-lg"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
