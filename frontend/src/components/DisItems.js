import React from "react";

export default function DisItems({ data }) {
  console.log(data);
  const {
    category,
    description,
    img,
    price,
    stock_status,
    title,
    veg_or_non_veg,
  } = data || "default";

  return (
    <div className="w-[700px] flex gap-20 justify-">
      <div className="w-[475px] flex flex-col gap-1">
        {/* <img className='h-3' src={vegImg} alt="" /> */}
        <span className="text-xl text-gray-700 font-bold">{title} </span>
        <span className="text-md font-semibold">RS. {price} ₹</span>
        <span className="text-gray-500">{description}</span>
        {veg_or_non_veg == "Veg" ? (
          <span className="bg-green-300 p-2 font-semibold w-max rounded-xl">
            {veg_or_non_veg}
          </span>
        ) : (
          <span className="bg-red-400 p-2 font-semibold w-max rounded-xl text-nowrap text-ellipsis">
            {veg_or_non_veg}
          </span>
        )}
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
