import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";

export default function SideBar() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div
      className={`h-dvh fixed bg-slate-100 transition-width duration-300 ${
        toggle ? "w-[70px]" : "w-[230px]"
      }`}
    >
      <div className="flex flex-col justify-center mt-1 gap-2">
        <div className="flex justify-center items-center gap-3 border-b-2 border-gray-300 py-3">
          <img className="h-12" src={logo} alt="Logo" />
          <span
            className={`text-lg font-semibold text-blue-600 transition-opacity duration-300 ${
              toggle ? "hidden" : ""
            }`}
          >
            Dashboard
          </span>
        </div>
        <ul className={`h-[450px] text-lg font-semibold flex flex-col justify-between`}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className={`${"px-5 py-2"} rounded-lg flex items-center gap-3`}>
              <i className="fa-solid fa-house"></i>
              <span className={`${toggle ? "hidden" : ""}`}>Home</span>
            </li>
          </NavLink>
          <NavLink
            to={"/admin/users"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className="px-5 py-2 rounded-lg flex items-center gap-3">
              <i className="fa-solid fa-users"></i>
              <span className={`${toggle ? "hidden" : ""}`}>Users</span>
            </li>
          </NavLink>
          <NavLink
            to={"/admin/orders"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className="px-5 py-2 rounded-lg flex items-center gap-3">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className={`${toggle ? "hidden" : ""}`}>Orders</span>
            </li>
          </NavLink>
          <NavLink
            to={"/admin/createitem"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className="px-5 py-2 rounded-lg flex items-center gap-3">
              <i className="fa-solid fa-plus"></i>
              <span className={`${toggle ? "hidden" : ""}`}>Create Item</span>
            </li>
          </NavLink>
          <NavLink
            to={"/admin/maindishes"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className="px-5 py-2 rounded-lg flex items-center gap-3">
              <i className="fa-solid fa-utensils"></i>
              <span className={`${toggle ? "hidden" : ""}`}>Main Dishes</span>
            </li>
          </NavLink>
          <NavLink
            to={"/admin/breakfast"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className="px-5 py-2 rounded-lg flex items-center gap-3">
              <i className="fa-solid fa-bowl-rice"></i>
              <span className={`${toggle ? "hidden" : ""}`}>Break Fast</span>
            </li>
          </NavLink>
          <NavLink
            to={"/admin/desserts"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className="px-5 py-2 rounded-lg flex items-center gap-3">
              <i className="fa-solid fa-cake-candles"></i>
              <span className={`${toggle ? "hidden" : ""}`}>Desserts</span>
            </li>
          </NavLink>
          <NavLink
            to={"/admin/beverages"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className="px-5 py-2 rounded-lg flex items-center gap-3">
              <i className="fa-solid fa-champagne-glasses"></i>
              <span className={`${toggle ? "hidden" : ""}`}>Beverages</span>
            </li>
          </NavLink>
        </ul>
        <div className="relative mt-5 w-full">
            <div
              className={`absolute p-1 bg-gray-300 rounded-l-md cursor-pointer right-0 bottom-0`}
              onClick={handleToggle}
            >
              {toggle ? (
                <i className="fa-solid fa-caret-right"></i>
              ) : (
                <i className="fa-solid fa-caret-left"></i>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}
