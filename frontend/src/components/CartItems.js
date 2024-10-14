import React, { useState, useEffect } from "react";
import { removeItem, addItem } from "./store/cartSlice";
import { useDispatch } from "react-redux";
import QuantitySelector from "./QuantitySelector";

export default function CartItems({ data }) {
  const dispatch = useDispatch();
  const { img, title, price, quantity: initialQuantity, veg, category, id } = data || {};
  // console.log(id)
  const [quantity, setQuantity] = useState(initialQuantity || 1);

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
        bgClass: veg ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600",
      };
    } else if (category === "Desserts") {
      return {
        text: veg ? "Chocolate" : "Cake",
        bgClass: veg ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600",
      };
    } else if (category === "Beverage") {
      return {
        text: veg ? "Hot" : "Cold",
        bgClass: veg ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600",
      };
    }
    return { text: "Unknown", bgClass: "bg-gray-100 text-gray-600" };
  };

  const { text, bgClass } = getVegStatus();

  return (
    <div className="flex flex-row-reverse items-start bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4 md:p-6 mb-6 transition-transform transform hover:scale-105 w-full md:w-[650px]">
      <div className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow pl-4">
        <h2 className="text-lg md:text-xl text-gray-800 font-bold truncate">{title}</h2>
        <p className="text-base font-semibold text-gray-700 mt-1">
          ₹{price.toFixed(2)} each
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Quantity: x{quantity} {quantity > 1 && `| Total: ₹${(price * quantity).toFixed(2)}`}
        </p>
        <span className={`mt-2 inline-block text-sm font-semibold py-1 px-2 rounded-full ${bgClass}`}>
          {text}
        </span>
        <div className="mt-4">
          <QuantitySelector
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>
      </div>
    </div>
  );
}
