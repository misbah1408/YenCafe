import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
// import { isAdmin } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "./store/locationSlice";
import { removeUser } from "./store/userSlice";

export default function NavBar() {
  const [cartValue, setCartValue] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const location = useSelector((state) => state.location); // Access location state from Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isAdmin } = useSelector((state) => state?.user) || false;
  // console.log(isAdmin)
  useEffect(() => {
    setCartValue(cart.length);
  }, [cart]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const handleChange = (event) => {
    const selectedLocation = event.target.value;
    dispatch(setLocation(selectedLocation));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-20 w-full flex items-center justify-between shadow-sm shadow-gray-300 px-4 md:px-8 fixed z-50 bg-white top-0">
      <Link to="/">
        <div className="flex items-center gap-3 ml-3">
          <img className="h-16" src={logo} alt="YenCafe Logo" />
          <span className="hidden md:flex text-xl font-bold text-gray-800">
            YenCafe
          </span>
        </div>
      </Link>
      <div className="md:flex items-center gap-1">
        <select
          name="location"
          id="location"
          className="rounded-md outline-none bg-white"
          value={location}
          onChange={handleChange}
        >
          <option value="">Select Location</option>
          <option value="4th Floor Balmatta">4th Floor Balmatta</option>
          <option value="6th Floor Balmatta">6th Floor Balmatta</option>
        </select>
      </div>

      <div className="hidden md:flex gap-5 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? " text-blue-600 font-semibold" : ""
          }
        >
          <span className="text-lg hover:bg-blue-100 px-3 py-2 rounded-xl">
            Home
          </span>
        </NavLink>
        <NavLink
          to="/myorder"
          className={({ isActive }) =>
            isActive ? " text-blue-600 font-semibold" : ""
          }
        >
          <span className="text-lg hover:bg-blue-100 px-3 py-2 rounded-xl">
            Your Order
          </span>
        </NavLink>
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? " text-blue-600 font-semibold" : ""
            }
          >
            <span className="text-lg hover:bg-blue-100 px-3 py-2 rounded-xl">
              Admin Panel
            </span>
          </NavLink>
        )}
      </div>
      <div className="md:flex items-center gap-10">
        {user ? (
          <>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? " rounded-full font-semibold" : ""
              }
            >
              <div className="relative flex">
                <i className="fa-solid fa-cart-shopping text-2xl text-gray-700 px-3 py-2 hover:bg-blue-100 rounded-full"></i>
                {cartValue > 0 && (
                  <span className="absolute left-5 text-blue-600 text-sm font-bold -top-3 px-3 py-2 rounded-full">
                    {cartValue}
                  </span>
                )}
              </div>
            </NavLink>
            <button
              className="hidden md:flex bg-blue-600 text-white px-5 py-1 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="hidden md:flex bg-blue-600 text-white px-5 py-1 rounded-lg"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
      {user ? (
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {!isMenuOpen ? (
              <i className="fa-solid fa-bars text-2xl"></i>
            ) : (
              <i className="fa-solid fa-xmark text-[28px]"></i>
            )}
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white h-10 w-10 rounded-full md:hidden"
          onClick={() => {
            handleLogin();
            toggleMenu();
          }}
        >
          <i className="fa-solid fa-right-to-bracket"></i>
        </button>
      )}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md md:hidden z-50">
          <div className="flex flex-col items-start p-4">
            <NavLink
              to="/"
              className="text-lg text-gray-700 w-full py-2"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/myorder"
              className="text-lg text-gray-700 w-full py-2"
              onClick={toggleMenu}
            >
              Your Order
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/admin"
                className="text-lg text-gray-700 w-full py-2"
                onClick={toggleMenu}
              >
                Admin Panel
              </NavLink>
            )}
            {localStorage.getItem("authToken") ? (
              <div className="flex flex-col items-start w-full gap-2">
                <NavLink
                  to="/cart"
                  className="w-full text-gray-700"
                  onClick={toggleMenu}
                >
                  Cart
                </NavLink>
                <button
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg w-full"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-lg w-24"
                onClick={() => {
                  handleLogin();
                  toggleMenu();
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
