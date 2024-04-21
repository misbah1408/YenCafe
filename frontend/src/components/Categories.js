import React from "react";

export default function Categories() {
  return (
    <div className="absolute left-[50%] translate-x-[-50%] mt-5 flex flex-col gap-10 ">
      <div className="text-center">
        <span className="text-2xl font-bold">Catagories</span>
      </div>
      <div className="flex gap-3">
        <div className="card1">Main Dish</div>
        <div className="card1">Break Fast</div>
        <div className="card1">Bevrages</div>
        <div className="card1">Browse All</div>
      </div>
    </div>
  );
}
