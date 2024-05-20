import React from "react";

export default function OrderedItems({ data }) {
  const { veg, title, quantity, price } = data || "default";
  // console.log(data)

  return (
    <div>
      <div className="flex">
        {veg === true ? (
          <span className="text-green-600 text-2xl font-semibold w-max rounded-xl">
            <i className="fa-regular fa-circle-stop"></i>
          </span>
        ) : (
          <span className="text-red-800 text-2xl font-semibold w-max rounded-xl text-nowrap text-ellipsis">
            <i className="fa-regular fa-circle-stop"></i>
          </span>
        )}
        <div className="text-lg font-semibold ml-2">
          <span>{quantity} x</span>
          <span> {title} - </span>
          <span className="text-sm text-gray-500"> RS.{price}₹</span>
        </div>
      </div>
    </div>
  );
}
