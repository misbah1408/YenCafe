import React, { useEffect, useState } from "react";
import EmptyCartPng from "../images/EmptyCart.png";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";
import { FETCH_URL, token } from "../utils/Constants";
import { useCart, useDispatchCart } from "./store/ContextReducer";
import { useLocation } from "./store/LocationContext";

export default function Cart() {
  const [cartItem, setCartItem] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const dispatch = useDispatchCart();
  const cart = useCart();
  const { location } = useLocation();
  // console.log(location)
  // console.log(cart);
  const grandT = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    setGrandTotal(total);
  };
  useEffect(() => {
    setCartItem(cart);
    grandT();
  }, [cart.length]);
  // console.log(token)
  // console.log(localStorage.getItem("authToken"))

  const handleCheckout = async () => {
    const orderData = {
      cart,
      location
    };
    if (!location || location === "") {
      alert("Please select a location");
    }
    if(location === "4th Floor Balmatta" || location === "6th Floor Balmatta") {
      try {
        const response = await fetch(`${FETCH_URL}/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(orderData),
        });
        if (response.ok) {
          console.log("Checkout successful");
          dispatch({ type: "CLEAR" });
          // Handle success
        } else {
          console.error("Checkout failed");
          // Handle failure
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        // Handle error
      }
    }
  };
  
  



  if (cart.length <= 0)
    return (
      <>
        <div className="relative top-8 flex felx-col justify-center p-10 mt-20">
          <div className="flex flex-col">
            <img src={EmptyCartPng} alt="empty cart png" />
            <Link to="/">
              <button className="bg-blue-600 w-full text-white p-5 rounded-lg font-semibold">
                Go to Home Page
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  return (
    <div className="flex justify-center mt-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold border-b-2 w-full text-center pb-3">
          CART & CHECKOUT
        </h1>
        <div className="mt-5">
          {cartItem?.map((item) => (
            <div key={item._id}>
              <CartItems data={item} />
            </div>
          ))}
        </div>
        <hr />
        <div className="w-[80%] md:w-full mt-5">
          <h1 className="w-full text-xl font-bold border-b-2 text-start pb-3">
            Billing
          </h1>
          <div className="flex justify-between">
            <span className="text-xl font-semibold ">Item total</span>
            <span className="text-xl font-semibold text-gray-500">RS. {grandTotal} ₹</span>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-green-600 w-[80%] md:w-full text-white p-5 rounded-lg font-semibold mt-5"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}