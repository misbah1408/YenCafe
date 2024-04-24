import React from "react";
import wLogo from "../images/logoWhite.png";
import { colLogo } from "../utils/Constants";

export default function Footer() {
  return (
    <div className="flex h-80 w-[100%] bg-black justify-center items-center gap-10">
      <div className="flex flex-col items-center gap-5 mr-10">
        <span className="text-xl text-white font-bold">
          Yenepoya (Deemed to be University)
        </span>
        <div className="flex gap-3 text-center ">
          <img
            className="h-20"
            src={colLogo}
            alt="college logo"
          />
          <img className="h-20" src={wLogo} alt="" />
        </div>
      </div>
      <div className="">
        <ul className="text-gray-500 text-md list-disc marker:">
          <span className="text-xl text-white font-bold">About Us</span>
          <li>About Yenepoya University</li>
          <li>Introduction, Vision & Mission</li>
          <li>Management & Administration Team</li>
          <li>Emblem</li>
          <li>MHRD GOVT. OF INDIA NOTIFICATION</li>
        </ul>
      </div>
      <div className="flex flex-col gap-5 ml-5">
        <ul className="text-gray-500 text-md list-disc">
        <span className="text-xl text-white font-bold">Contact us</span>
          <li> Help & Support</li>
          <li> Partner with us</li>
          <li> Ride with us</li>
        </ul>
        <ul className="text-gray-500 text-md list-disc">
        <span className="text-xl text-white font-bold">Legal</span>
          <li>Terms & conditions</li>
          <li>Cookie policy</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="ml-5">
        <ul className="text-gray-500 text-md "><span className="text-xl text-white font-bold">Links</span>
          <li><i className="fa-brands fa-github text-2xl text-white"></i>     GitHub</li>
          <li><i className="fa-brands fa-linkedin  text-2xl text-white"></i>    LinkedIn</li>
          <li><i className="fa-brands fa-instagram  text-2xl text-white"></i>    Instagram</li>
          <li><i className="fa-brands fa-facebook  text-2xl text-white"></i>    Facebook</li>
        </ul>
      </div>
    </div>
  );
}
