import React from "react";
import wLogo from "../images/logoWhite.png";
import { colLogo } from "../utils/Constants";

export default function Footer() {
  return (
    <div className="flex flex-wrap bg-black text-gray-400 py-10 justify-center items-start gap-10 px-5 md:px-20">
      <div className="flex flex-col items-center gap-5 mr-10">
        <span className="text-white font-bold text-center text-sm md:text-lg">
          Yenepoya 
          <span className="block text-[10px] md:text-sm">(Deemed to be University)</span>
        </span>
        <div className="flex gap-4 items-center">
          <img className="h-10 md:h-20" src={colLogo} alt="college logo" />
          <img className="h-10 md:h-20" src={wLogo} alt="white logo" />
        </div>
      </div>

      <div className="hidden md:block w-40">
        <span className="text-white font-bold">About Us</span>
        <ul className="text-gray-400 text-sm space-y-1 mt-2">
          <li className="hover:text-gray-300 cursor-pointer">About Yenepoya University</li>
          <li className="hover:text-gray-300 cursor-pointer">Vision & Mission</li>
          <li className="hover:text-gray-300 cursor-pointer">Management Team</li>
          <li className="hover:text-gray-300 cursor-pointer">Emblem</li>
          <li className="hover:text-gray-300 cursor-pointer">Govt. Notification</li>
        </ul>
      </div>

      <div className="flex flex-col gap-5 w-40">
        <div>
          <span className="text-white font-bold">Contact Us</span>
          <ul className="text-sm space-y-1 mt-2">
            <li className="hover:text-gray-300 cursor-pointer">Help & Support</li>
            <li className="hover:text-gray-300 cursor-pointer">Partner with Us</li>
            <li className="hover:text-gray-300 cursor-pointer">Ride with Us</li>
          </ul>
        </div>
        <div>
          <span className="text-white font-bold">Legal</span>
          <ul className="text-sm space-y-1 mt-2">
            <li className="hover:text-gray-300 cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-gray-300 cursor-pointer">Cookie Policy</li>
            <li className="hover:text-gray-300 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>

      <div className="w-40">
        <span className="text-white font-bold">Follow Us</span>
        <ul className="flex gap-4 mt-2 text-white">
          <li>
            <a href="https://github.com/misbah1408" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <i className="fa-brands fa-github text-xl"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/mohammed-misba-482802259/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <i className="fa-brands fa-linkedin text-xl"></i>
            </a>
          </li>
          <li>
            <a href="https://instagram.com/m1sba.h_" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
