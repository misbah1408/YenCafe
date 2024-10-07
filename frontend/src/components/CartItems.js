import React from "react";
import { removeItem } from "./store/cartSlice";
import { useDispatch } from "react-redux";

export default function CartItems({ data }) {
  const dispatch = useDispatch();
  const { img, title, price, quantity, veg } = data || {};

  const handleClick = async () => {
    await dispatch(removeItem({id: data.id} ));
    // console.log("Updated cart:", cart);
  };
  return (
    <div className="w-[300px] md:w-[700px] flex md:gap-20 gap-5">
      <div className="w-[475px] flex flex-col gap-1">
        {/* {veg ? (
          <span className="text-green-600 text-md md:text-xl font-semibold w-max rounded-xl">
            <i className="fa-regular fa-circle-stop"></i>
          </span>
        ) : (
          <span className="text-red-800 text-md md:text-xl font-semibold w-max rounded-xl">
            <i className="fa-regular fa-circle-stop"></i>
          </span>
        )} */}
        <span className="text-lg md:text-xl text-gray-700 font-bold text-nowrap">{title}</span>
        <span className="text-xs md:text-lg font-semibold">RS. {price/quantity} ₹</span>
        <span className="text-xs md:text-lg font-semibold">Quantity: x{quantity} | RS. {price} ₹</span>
        <div className="w-max pb-5 mt-3">
          <span
            className="h-5 w-20 p-1 px-3 rounded-md text-center text-white bg-blue-600 cursor-pointer"
            onClick={handleClick}
          >
            Remove
          </span>
        </div>
      </div>
      <div>
        <p
          className="h-16 w-24 rounded-md md:h-28 md:w-36 bg-cover bg-center md:rounded-xl"
          style={{ backgroundImage: `url(${img})` }}
        ></p>
      </div>
    </div>
  );
}