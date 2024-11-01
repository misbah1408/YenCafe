import React from "react";

export default function MainDishes({ data, price }) {
  const { category, description, img, title, veg } = data || "default";
  // console.log(data.floor)
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
    <div className=" w-full lg:w-full md:w-full flex md:gap-20 justify-between">
      <div className="w-[475px] flex flex-col gap-1">
        {veg === true ? (
          <span
            className={`${bgClass} text-md md:text-2xl text-md font-semibold w-max rounded-xl`}
          >
            <i className={iconClass}></i>
          </span>
        ) : (
          <span
            className={`${bgClass} md:text-2xl text-md font-semibold w-max rounded-xl text-nowrap text-ellipsis`}
          >
            <i className={iconClass}></i>
          </span>
        )}
        <span className="md:text-xl text-md text-gray-700 font-bold text-nowrap">
          {title}
        </span>
        <span className="md:text-lg text-xs font-semibold ">RS. {price} ₹</span>
        <span className="text-gray-500 text-sm md:text-lg hidden md:flex">{description}</span>
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
