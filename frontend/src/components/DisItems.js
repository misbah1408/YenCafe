import React, { useState } from "react";
import Shimmer from "./Shimmer";
import MainDishes from "./MainDishes";
import { useDispatchCart, useCart } from "./ContextReducer";
import BreakFast from "./BreakFast";

export default function DisItems({ data }) {
  //console.log(data);
  const [add, setAdd] = useState("Add");
  const [qua, setQua] = useState(1);
  const dispatch = useDispatchCart();
  // const cartData = useCart();
  if (data.length <= 0)
    return (
      <div>
        <Shimmer />
      </div>
    );
  const { category, img, price, title, veg, in_stock } = data || "default";
  const handleClick = async () => {
    setAdd((prevAdd) => (prevAdd === "Add" ? "Remove" : "Add"));
    if (add === "Add") {
      await dispatch({
        type: "ADD",
        id: data?._id,
        img,
        price: finalPrice,
        title,
        veg,
        quantity: qua,
      });
      // console.log(cartData);
      
    } else {
      await dispatch({ type: "REMOVE", id: data?._id });
      // console.log(cartData);
    }
    // console.log(cartData);
  };
  const finalPrice = qua * price;

  const QuantitySelector = ({ setQua, handleClick, add }) => (
    <div className="flex gap-3 items-center mt-3">
      <div>
        <select
          name=""
          id=""
          className="px-3 outline-none border-2 border-gray-200 rounded-md"
          onChange={(e) => {
            setQua(e.target.value);
          }}
        >
          {Array.from(Array(5), (e, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="w-max">
        <span
          className="h-5 w-20 p-1 px-3 rounded-md text-center text-white bg-blue-600 cursor-pointer"
          onClick={handleClick}
        >
          {add}
        </span>
      </div>
    </div>
  );
  
  const renderContent = () => {
    if (category === "Main Course" && in_stock) {
      return (
        <>
          <MainDishes data={data} price={finalPrice} />
          <QuantitySelector setQua={setQua} handleClick={handleClick} add={add} />
        </>
      );
    } else if (category === "Break fast") {
      return (
        <>
          <BreakFast data={data} price={finalPrice} />
          <QuantitySelector setQua={setQua} handleClick={handleClick} add={add} />
        </>
      );
    } else {
      return null;
    }
  };
  
  
  return <div>{renderContent()}</div>;
}
