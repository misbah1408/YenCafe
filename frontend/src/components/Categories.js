import React from "react";
import mainDish from "../images/main-dish.png";
import breakFast from "../images/breakfast.png";
import dessert from "../images/dessert.png";
import bevrage from "../images/bevrage.png";

export default function Categories() {
  return (
    <div className="items-center mt-5 flex flex-col gap-10 ">
      <div className="text-center">
        <span className="text-2xl font-bold">Catagories</span>
      </div>
      <div className="flex gap-10">
        <div className="h-[200px] w-[170px] shadow-equal rounded-2xl flex items-center justify-center cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 bg-blue-300 -mt-3 flex items-center justify-center rounded-full shadow-equal">
              <img
                className="h-[5.7rem] drop-shadow-2xl pr-1 pb-1 "
                src={mainDish}
                alt="biriyani"
              />
            </div>
            <span className="font-semibold mt-2">Main Dish</span>
            <span className="text-[11px] font-semibold">(25 Dishe)</span>
          </div>
        </div>
        <div className="h-[200px] w-[170px] shadow-equal rounded-2xl flex items-center justify-center cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 bg-blue-300 -mt-3 flex items-center justify-center rounded-full shadow-equal">
              <img
                className="h-[5.5rem] drop-shadow-2xl px-[4px] "
                src={breakFast}
                alt="breakFast"
              />
            </div>
            <span className="font-semibold mt-2">Break fast</span>
            <span className="text-[11px] font-semibold">(25 Break fast)</span>
          </div>
        </div>
        <div className="h-[200px] w-[170px] shadow-equal rounded-2xl flex items-center justify-center cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 bg-blue-300 -mt-3 flex items-center justify-center rounded-full shadow-equal">
              <img
                className="h-[6.8rem] drop-shadow-2xl "
                src={dessert}
                alt="dessert"
              />
            </div>
            <span className="font-semibold mt-2">Dessert</span>
            <span className="text-[11px] font-semibold">(25 Dessert)</span>
          </div>
        </div>
        <div className="h-[200px] w-[170px] shadow-equal rounded-2xl flex items-center justify-center cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 bg-blue-300 -mt-3 flex items-center justify-center rounded-full shadow-equal">
              <img
                className="h-[5.2rem] drop-shadow-2xl pl-1"
                src={bevrage}
                alt="bevrage"
              />
            </div>
            <span className="font-semibold mt-2">Bevrage</span>
            <span className="text-[11px] font-semibold">(25 Bevrage)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
