import React, { useEffect, useState } from "react";
import EmptyCartPng from "../images/EmptyCart.png";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";
import { FETCH_URL, token } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
  const [cartItem, setCartItem] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  // Calculate Grand Total based on cart items and their quantity
  const calculateGrandTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    // console.log(total)
    setGrandTotal(total);
  };

  useEffect(() => {
    setCartItem(cart);
    calculateGrandTotal();
  }, [cart]);

  const handleCheckout = async () => {
    if (!location || location === "") {
      console.log(location);
      toast.error("Please select a location", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
      });
      return; // Exit the function after showing the toast
    }

    const orderData = {
      cart,
      location,
      total: grandTotal,
    };

    {
      try {
        const response = await fetch(`${FETCH_URL}/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          dispatch(clearCart());
          console.log("Checkout successful");
        } else {
          console.error("Checkout failed");
        }
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    }
  };

  if (cart.length <= 0)
    return (
      <div className="relative top-8 flex flex-col justify-center p-10  m-auto items-center">
        <div className="flex flex-col w-[38%]">
          <img src={EmptyCartPng} alt="empty cart" />
          <Link to="/">
            <button className="bg-blue-600 w-full text-white p-5 rounded-lg font-semibold">
              Go to Home Page
            </button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center mt-24">
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full justify-center items-center">
          <h1 className="text-xl font-bold border-b-2 w-full  pb-3">
            CART & CHECKOUT
          </h1>
          <span
            className=" text-xl font-bold border-b-2  pb-3 text-nowrap hover:text-red-600"
            onClick={() => dispatch(clearCart())}
          >
            Clear <i className="fa-regular fa-circle-xmark text-red-600"></i>
          </span>
        </div>
        <div className="mt-5">
          {cartItem?.map((item) => (
            <div key={item.id}>
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
            <span className="text-xl font-semibold">Item total</span>
            <span className="text-xl font-semibold text-gray-500">
              RS. {grandTotal} ₹
            </span>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-green-600 w-[80%] md:w-full text-white p-5 rounded-lg font-semibold mt-5"
        >
          Checkout
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
