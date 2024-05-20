import React, { useEffect, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import EmptyCartPng from "../images/EmptyCart.png";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";
import { token } from "../utils/Constants";

export default function Cart() {
  const [cartItem, setCartItem] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const dispatch = useDispatchCart();


  const cart = useCart();

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
  console.log(token)

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cart), // Use 'cart' instead of 'cartItem'
      });
      if (response.ok) {
        console.log("Checkout successful");
        dispatch({type: "CLEAR"})
        
        // Handle success (e.g., show a success message, redirect)
      } else {
        console.error("Checkout failed");
        // Handle failure (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle error (e.g., show an error message)
    }
  };
  



  if (cart.length <= 0)
    return (
      <>
        <div className="relative top-8 flex felx-col justify-center p-10">
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
    <div className="flex justify-center mt-3">
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
        <div className="w-full mt-5">
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
          className="bg-green-600 w-full text-white p-5 rounded-lg font-semibold mt-5"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
