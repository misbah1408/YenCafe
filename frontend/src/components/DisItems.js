import React from "react";
import Shimmer from "./Shimmer";

export default function DisItems({ data }) {
  // console.log(data);
  if(!data) return(
    <div>
    <Shimmer/>
    {/* <Shimmer/>
    <Shimmer/>
    <Shimmer/>
    <Shimmer/> */}
    </div>
  );
  const { category, description, img, price, title, veg } = data || "default";

  const renderContent = () => {
    switch (category) {
      case "Main Course":
        return (
          <div className="w-[700px] flex gap-20 justify-">
            <div className="w-[475px] flex flex-col gap-1">
              {veg === true ? (
                <span className="text-green-600 text-2xl font-semibold w-max rounded-xl">
                  <i className="fa-regular fa-circle-stop"></i>
                </span>
              ) : (
                <span className="text-red-800 text-2xl font-semibold w-max rounded-xl text-nowrap text-ellipsis">
                  <i className="fa-regular fa-circle-stop"></i>
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
      case "Break fast":
        return (
          <div className="w-[700px] flex gap-20 justify-">
            <div className="w-[475px] flex flex-col gap-1">
              {veg === true ? (
                <span className="text-green-600 text-2xl font-semibold w-max rounded-xl">
                  <i className="fa-regular fa-circle-stop"></i>
                </span>
              ) : (
                <span className="text-red-800 text-2xl font-semibold w-max rounded-xl text-nowrap text-ellipsis">
                  <i className="fa-regular fa-circle-stop"></i>
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
        default :
          return (
            null
          );
    }
  };
  return <div>{renderContent()}</div>;
}
