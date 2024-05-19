import React, { useState } from "react";
import Shimmer from "./Shimmer";
import MainDishes from "./MainDishes";
import { useDispatchCart, useCart } from "./ContextReducer";
import BreakFast from "./BreakFast";

export default function DisItems({ data }) {
  // console.log(data);
  const [add, setAdd] = useState("Add");
  const [qua, setQua] = useState(1);
  const dispatch = useDispatchCart();
  // const cartData = useCart();
  if (!data)
    return (
      <div>
        <Shimmer />
      </div>
    );
  const { category, img, price, title, veg } = data || "default";
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

  const renderContent = () => {
    switch (category) {
      case "Main Course":
        return (
          <>
            <MainDishes data={data} price={finalPrice} />
            <div className="flex gap-3 items-center mt-3">
              <div>
                <select
                  name=""
                  id=""
                  className="px-3  outline-none border-2 border-gray-200 rounded-md"
                  onChange={(e) => {
                    setQua(e.target.value);
                  }}
                >
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
                <span
                  className="h-5 w-20 p-1 px-3 rounded-md text-center text-white bg-blue-600 cursor-pointer"
                  onClick={handleClick}
                >
                  {add}
                </span>
              </div>
            </div>
          </>
        );
      case "Break fast":
        return (
          <>
            <BreakFast data={data} price={finalPrice}/>
            <div className="flex gap-3 items-center mt-3">
              <div>
                <select
                  name=""
                  id=""
                  className="px-3  outline-none border-2 border-gray-200 rounded-md"
                  onChange={(e) => {
                    setQua(e.target.value);
                  }}
                >
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
                <span
                  className="h-5 w-20 p-1 px-3 rounded-md text-center text-white bg-blue-600 cursor-pointer"
                  onClick={handleClick}
                >
                  {add}
                </span>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };
  return <div>{renderContent()}</div>;
}
