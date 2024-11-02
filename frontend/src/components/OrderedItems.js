import React from "react";

export default function OrderedItems({ data }) {
  const { veg, title, quantity, price, category } = data || "default";
  // console.log(data)
  const getVegStatus = () => {
    if (category === "Main Course" || category === "Break fast") {
      return {
        text: veg ? "Veg" : "Non-Veg",
        bgClass: veg ? "text-green-600" : "text-red-600",
        iconClass: "fa-regular fa-circle-stop",
      };
    } else if (category === "Desserts") {
      return {
        text: veg ? "Chocolate" : "Cake",
        bgClass: veg ? "text-yellow-600" : "text-red-600",
        iconClass: veg ? "fa-solid fa-cookie-bite" : "fa-solid fa-cake-candles",
      };
    } else if (category === "Beverage") {
      return {
        text: veg ? "Hot" : "Cold",
        bgClass: veg ? "text-red-600" : "text-blue-600",
        iconClass: veg ? "fa-solid fa-mug-hot" : "fa-solid fa-snowflake",
      };
    }
    return { text: "Unknown", bgClass: "bg-gray-100 text-gray-600" };
  };
  const { bgClass, iconClass } = getVegStatus();

  return (
    <div>
      <div className="flex">
      {veg === true ? (
          <span
            className={`${bgClass} text-md md:text-lg text-md font-semibold w-max rounded-xl`}
          >
            <i className={iconClass}></i>
          </span>
        ) : (
          <span
            className={`${bgClass} md:text-lg text-md font-semibold w-max rounded-xl text-nowrap text-ellipsis`}
          >
            <i className={iconClass}></i>
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
