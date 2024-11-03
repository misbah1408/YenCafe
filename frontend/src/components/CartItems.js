import React, { useState, useEffect } from "react";
import { removeItem, addItem } from "./store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import QuantitySelector from "./QuantitySelector";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartItems({ data }) {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const {
    img,
    title,
    price,
    quantity: initialQuantity,
    veg,
    category,
    id,
    floor,
  } = data || {};
  // console.log(id)
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  useEffect(() => {
    if (location === "6th Floor Balmatta" && floor !== "sixth floor") {
      toast.info(
        "Some items were removed because they are not available on this floor.",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        }
      );
      handleRemove();
    } else if (location === "4th Floor Balmatta" && floor !== "fourth floor") {
      toast.info(
        "Some items were removed because they are not available on this floor.",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        }
      );
      handleRemove();
    }
  }, [location, floor, id, dispatch]);

  // Update local quantity state when the data changes
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleRemove = () => {
    dispatch(removeItem({ id: id }));
  };

  const handleIncrement = () => {
    const newQuantity = quantity - quantity + 1;
    setQuantity(newQuantity);
    dispatch(
      addItem({
        id: id,
        category,
        img,
        price,
        title,
        veg,
        quantity: newQuantity,
        floor,
      })
    );
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1 - quantity;
      setQuantity(newQuantity);
      dispatch(
        addItem({
          id: id,
          category,
          img,
          price,
          title,
          veg,
          quantity: newQuantity,
          floor,
        })
      );
    } else {
      handleRemove();
    }
  };

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

  const { iconClass, bgClass } = getVegStatus();

  return (
    <>
      <div className="flex items-start bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4 md:py-2 md:px-4 mb-2 transition-transform transform w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
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
            <h2 className="text-sm md:text-lg text-gray-800 font-semibold truncate">
              {title}
            </h2>
          </div>
          <div className="flex gap-3 items-center">
            <QuantitySelector
              quantity={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
            <span className="text-sm md:text-lg font-semibold">₹ {price * quantity}</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
