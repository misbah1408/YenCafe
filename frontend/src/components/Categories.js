import React from "react";
import mainDish from "../images/main-dish.png";
import breakFast from "../images/breakfast.png";
import dessert from "../images/dessert.png";
import bevrage from "../images/bevrage.png";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div className="items-center mt-10 flex flex-col gap-10 text-xs md:text-md">
      <div className="text-center">
        <span className="font-bold text-lg md:text-2xl">Categories</span>
      </div>
      <div className="flex flex-wrap justify-center gap-10 md:gap-10">
        <Link to={`/menu/maindish`}>
          <div className="h-[190px] w-[150px] md:h-[200px] md:w-[170px] text-[14px] md:text-12 shadow-equal rounded-2xl flex items-center justify-center cursor-pointer hover:translate-y-2 transition-all">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 md:h-24 md:w-24 bg-blue-300 -mt-3 flex items-center justify-center rounded-full shadow-equal">
                <img
                  className="h-16 md:h-[5.7rem] drop-shadow-2xl md:pr-1 md:pb-1"
                  src={mainDish}
                  alt="main dish"
                />
              </div>
              <span className="font-semibold mt-2">Main Course</span>
              <span className="text-[11px] font-semibold">(6 Dishes)</span>
            </div>
          </div>
        </Link>
        <Link to={`/menu/breakfast`}>
          <div className="h-[190px] w-[150px] md:h-[200px] md:w-[170px] text-[14px] md:text-12 shadow-equal rounded-2xl flex items-center justify-center cursor-pointer hover:translate-y-2 transition-all">
            <div className="flex flex-col items-center gap-4 md:gap-2">
              <div className="h-20 w-20 md:h-24 md:w-24 bg-blue-300 -mt-3 flex items-center justify-center rounded-full shadow-equal">
                <img
                  className="h-18 md:h-[5.5rem] drop-shadow-2xl px-[4px]"
                  src={breakFast}
                  alt="breakfast"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold md:mt-2 text-[14px]">Breakfast</span>
                <span className="text-[10px] md:text-[11px] font-semibold">(6 Breakfast)</span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={`/menu/desserts`}>
          <div className="h-[190px] w-[150px] md:h-[200px] md:w-[170px] text-[14px] md:text-12 shadow-equal rounded-2xl flex items-center justify-center cursor-pointer hover:translate-y-2 transition-all">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 md:h-24 md:w-24 bg-blue-300 -mt-3 flex items-center justify-center rounded-full shadow-equal">
                <img
                  className="h-18 md:h-[6.8rem] drop-shadow-2xl"
                  src={dessert}
                  alt="dessert"
                />
              </div>
              <span className="font-semibold mt-2 text-wrap text-center">Dessert & Chocolate</span>
              <span className="text-[11px] font-semibold">(2 Desserts)</span>
            </div>
          </div>
        </Link>
        <Link to={`/menu/beverage`}>
          <div className="h-[190px] w-[150px] md:h-[200px] md:w-[170px] text-[14px] md:text-12 shadow-equal rounded-2xl flex items-center justify-center cursor-pointer hover:translate-y-2 transition-all">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 md:h-24 md:w-24 bg-blue-300 -mt-3 flex items-center justify-center rounded-full shadow-equal">
                <img
                  className="h-16 md:h-[5.2rem] drop-shadow-2xl pl-1"
                  src={bevrage}
                  alt="beverage"
                />
              </div>
              <span className="font-semibold mt-2">Beverage</span>
              <span className="text-[11px] font-semibold">(2 Beverage)</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
