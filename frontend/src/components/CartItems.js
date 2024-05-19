import React, { useEffect } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function CartItems({ data }) {
  const dispatch = useDispatchCart();
  const cart = useCart();
  const { img, title, price, quantity, veg } = data || {};

  const handleClick = async () => {
    await dispatch({ type: "REMOVE", id: data.id });
    // console.log("Updated cart:", cart);
  };
  return (
    <div className="w-[700px] flex gap-20">
      <div className="w-[475px] flex flex-col gap-1">
        {veg ? (
          <span className="text-green-600 text-2xl font-semibold w-max rounded-xl">
            <i className="fa-regular fa-circle-stop"></i>
          </span>
        ) : (
          <span className="text-red-800 text-2xl font-semibold w-max rounded-xl">
            <i className="fa-regular fa-circle-stop"></i>
          </span>
        )}
        <span className="text-xl text-gray-700 font-bold">{title}</span>
        <span className="text-md font-semibold">RS. {price} ₹</span>
        <span className="text-md font-semibold">Quantity: x{quantity} | RS. {quantity*price} ₹</span>
        <div className="w-max pb-5">
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
          className="h-28 w-36 bg-cover bg-center rounded-xl"
          style={{ backgroundImage: `url(${img})` }}
        ></p>
      </div>
    </div>
  );
}
