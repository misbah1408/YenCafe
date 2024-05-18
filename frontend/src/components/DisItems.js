import React, { useState } from "react";
import Shimmer from "./Shimmer";
import MainDishes from "./MainDishes";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function DisItems({ data }) {
  // console.log(data);
  const [add, setAdd] = useState("Add");
  const [qua, setQua] = useState(1)
  const dispatch = useDispatchCart();
  const cartData = useCart();
  if (!data)
    return (
      <div>
        <Shimmer />
      </div>
    );
  const { category, description, img, price, title, veg } = data || "default";
  const handleClick = async () => {
    setAdd((prevAdd) => (prevAdd === "Add" ? "Remove" : "Add"));
    await dispatch({ type: "ADD", id: data?._id, img, price:finalPrice, title, veg, quantity: qua,   });
    console.log(cartData)
  };
  const finalPrice = qua*price

  const renderContent = () => {
    switch (category) {
      case "Main Course":
        return (
          <>
            <MainDishes data={data} price={finalPrice}/>
            <div className="flex gap-3 items-center mt-3">
              <div>
                <select name="" id="" className="px-3  outline-none border-2 border-gray-200 rounded-md" onChange={(e)=>{setQua(e.target.value)}}>
                  {Array.from(Array(5), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-max ">
                <span className="h-5 w-20 p-1 px-3 rounded-md text-center text-white bg-blue-600" onClick={handleClick}>
                  {add}
                </span>
              </div>
            </div>
          </>
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
              <div className="w-max text-black bg-blue-300">
                <span className="h-5 w-20 p-2" onClick={handleClick}>
                  {add}
                </span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return <div>{renderContent()}</div>;
}
