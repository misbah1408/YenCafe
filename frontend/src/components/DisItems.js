import React, { useState } from "react";
import Shimmer from "./Shimmer";
import MainDishes from "./MainDishes";
import { useDispatchCart } from "./store/ContextReducer";
import BreakFast from "./BreakFast";
import Beverage from "./Beverage";
import Desserts from "./Desserts";

export default function DisItems({ data }) {
  const [add, setAdd] = useState("Add");
  const [qua, setQua] = useState(1);
  const dispatch = useDispatchCart();

  if (!data || data.length === 0) {
    return <Shimmer />;
  }

  const { category, img, price, title, veg, in_stock, _id } = data;

  const handleClick = async () => {
    if (!in_stock) return;
    setAdd((prevAdd) => (prevAdd === "Add" ? "Remove" : "Add"));
    if (add === "Add") {
      await dispatch({
        type: "ADD",
        id: _id,
        img,
        price: finalPrice,
        title,
        veg,
        quantity: qua,
      });
    } else {
      await dispatch({ type: "REMOVE", id: _id });
    }
  };

  const finalPrice = qua * price;

  const QuantitySelector = () => (
    <div className="flex gap-3 items-center mt-3">
      <div>
        <select
          className="px-3 outline-none border-2 border-gray-200 rounded-md"
          value={qua}
          onChange={(e) => setQua(Number(e.target.value))}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="w-max">
        <span
          className={`h-10 w-24 p-2 rounded-md text-center text-white ${
            in_stock
              ? "bg-blue-600 cursor-pointer"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          onClick={handleClick}
          style={{ cursor: in_stock ? "pointer" : "not-allowed" }}
        >
          {in_stock ? add : "Out of Stock"}
        </span>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (category.toLowerCase()) {
      case "main course":
        return (
          <div className="w-[100%] p-5 bg-white rounded-lg shadow-md">
            <MainDishes data={data} price={finalPrice} />
            <QuantitySelector />
          </div>
        );
      case "break fast":
        return (
          <div className="p-5 bg-white rounded-lg shadow-md">
            <BreakFast data={data} price={finalPrice} />
            <QuantitySelector />
          </div>
        );
      case "beverage":
        return (
          <div className="p-5 bg-white rounded-lg shadow-md">
            <Beverage data={data} price={finalPrice} />
            <QuantitySelector />
          </div>
        );
        case "desserts":
        return (
          <div className="p-5 bg-white rounded-lg shadow-md">
            <Desserts data={data} price={finalPrice} />
            <QuantitySelector />
          </div>
        );

      default:
        return (
          <div className="p-5 bg-white rounded-lg shadow-md">
            Unknown Category
          </div>
        );
    }
  };

  return <div className="md:max-w-3xl md:mx-auto md:my-1">{renderContent()}</div>;
}
