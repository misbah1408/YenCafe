import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";

export default function SideBar() {
  return (
    <div className="h-dvh w-[250px] bg-slate-100 fixed">
      <div className="flex flex-col justify-center mt-1 gap-2">
        <div className="flex justify-center items-center gap-3 border-b-2 border-gray-300 py-3">
          <img className="h-12" src={logo} alt="" />
          <span className="text-lg font-semibold text-blue-600">Dashboard</span>
        </div>
        <ul className="text-xl font-semibold flex flex-col gap-3">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? " text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className=" px-5 py-2 rounded-lg">Home</li>
          </NavLink>
          <NavLink
            to={"/admin/users"}
            className={({ isActive }) =>
              isActive
                ? " text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className=" px-5 py-2 rounded-lg">Users</li>
          </NavLink>
          <NavLink
            to={"/admin/orders"}
            className={({ isActive }) =>
              isActive
                ? " text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className=" px-5 py-2 rounded-lg">Orders</li>
          </NavLink>
          <NavLink
            to={"/admin/createitem"}
            className={({ isActive }) =>
              isActive
                ? " text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className=" px-5 py-2 rounded-lg">Create Item</li>
          </NavLink>
          <NavLink
            to={"/admin/maindishes"}
            className={({ isActive }) =>
              isActive
                ? " text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className=" px-5 py-2 rounded-lg">Main Dishes</li>
          </NavLink>
          <NavLink
            to={"/admin/breakfast"}
            className={({ isActive }) =>
              isActive
                ? " text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className=" px-5 py-2 rounded-lg">Break Fast</li>
          </NavLink>
          <NavLink
            to={"/admin/desserts"}
            className={({ isActive }) =>
              isActive
                ? " text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className=" px-5 py-2 rounded-lg">Desserts</li>
          </NavLink>
          <NavLink
            to={"/admin/beverages"}
            className={({ isActive }) =>
              isActive
                ? " text-blue-600 font-semibold rounded-lg bg-gray-200"
                : ""
            }
          >
            <li className=" px-5 py-2 rounded-lg">Beverages</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
