import React from "react";

export default function Desserts({data, price}) {
    const {description, img, title, veg } = data || "default";
  return (
    <div className="w-[300px] md:w-[700px] flex md:gap-20 justify-between">
      <div className="w-[475px] flex flex-col gap-1">
        {veg === true ? (
          <span className="text-[#9b2948] text-md md:text-2xl font-semibold w-max rounded-xl">
            <i class="fa-solid fa-cookie-bite"></i> <small>Chocolate</small>
          </span>
        ) : (
          <span className="text-[#368BC1] text-md md:text-2xl font-semibold w-max rounded-xl text-nowrap text-ellipsis">
            <i class="fa-solid fa-cake-candles"></i> <small>Cake</small>
          </span>
        )}
        <span className="md:text-xl text-md text-gray-700 font-bold text-nowrap">{title} </span>
        <span className="md:text-lg text-xs font-semibold ">RS. {price} ₹</span>
        <span className="text-gray-500 text-sm md:text-lg">{description}</span>
      </div>
      <div className="h-28 w-28 md:h-28 md:w-36">
        <p
          className="h-20 w-28 md:h-28 md:w-36 bg-cover bg-center rounded-xl"
          style={{ backgroundImage: `url(${img})` }}
        ></p>
        
      </div>
    </div>
  );
}
