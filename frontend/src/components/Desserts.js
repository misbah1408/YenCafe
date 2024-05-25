import React from "react";

export default function Desserts({data, price}) {
    const {description, img, title, veg } = data || "default";
  return (
    <div className="w-[700px] flex gap-20 justify-">
      <div className="w-[475px] flex flex-col gap-1">
        {veg === true ? (
          <span className="text-[#9b2948] text-xl font-semibold w-max rounded-xl">
            <i class="fa-solid fa-cookie-bite"></i> <small>Chocolate</small>
          </span>
        ) : (
          <span className="text-[#368BC1] text-xl font-semibold w-max rounded-xl text-nowrap text-ellipsis">
            <i class="fa-solid fa-cake-candles"></i> <small>Cake</small>
          </span>
        )}
        <span className="text-xl text-gray-700 font-bold">{title} </span>
        <span className="text-md font-semibold">RS. {price} ₹</span>
        <span className="text-gray-500">{description}</span>
      </div>
      <div>
        <p
          className="h-28 w-36 bg-cover bg-center rounded-xl"
          style={{ backgroundImage: `url(${img})` }}
        ></p>
        
      </div>
    </div>
  );
}
