import React, { useEffect, useState } from "react";
import EmptyCartPng from "../images/EmptyCart.png";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";
import { FETCH_URL, token } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../images/logo.png";

export default function Cart() {
  const [cartItem, setCartItem] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  // console.log(cart)
  const calculateGrandTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setGrandTotal(total);
  };
  useEffect(() => {
    calculateGrandTotal(); // This will update the grand total based on cart items
  }, [cart]);

  useEffect(() => {
    setCartItem(cart);
  }, [cart]);

  const handleCheckout = async () => {
    if (!location || location === "") {
      toast.error("Please select a location", { position: "top-center" });
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method", { position: "top-center" });
      return;
    }
    const orderData = {
      cart,
      location,
      total: grandTotal,
      paymentMethod,
    };

    try {
      const response = await fetch(`${FETCH_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();
      // console.log(responseData);

      if (response.ok) {
        if (paymentMethod === "UPI") {
          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: responseData.amount,
            currency: responseData.currency,
            name: "YenCafe",
            description: "Order Payment",
            image: logo,
            order_id: responseData.razorpay_order_id,
            handler: async function (response) {
              try {
                // console.log(response);
                const verifyResponse = await fetch(
                  `${FETCH_URL}/verify-payment`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                    }),
                  }
                );

                const verifyData = await verifyResponse.json();
                // console.log(verifyData);

                if (verifyData.success) {
                  toast.success("Payment successful", {
                    position: "top-right",
                  });
                  setTimeout(() => {
                    dispatch(clearCart());
                  }, 3000);
                } else {
                  toast.error("Payment verification failed", {
                    position: "top-center",
                  });
                }
              } catch (error) {
                toast.error("Error verifying payment", {
                  position: "top-center",
                });
                console.error("Error verifying payment:", error);
              }
            },
            prefill: {
              name: user.campusId,
              email: user.email,
              contact: "9876543210",
            },
            theme: {
              color: "#3399cc",
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          toast.success("Order placed successfully", {
            position: "top-right",
          });
          setTimeout(() => {
            dispatch(clearCart());
          }, 3000);
        }
      } else {
        toast.error("Checkout failed", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Error during checkout", { position: "top-center" });
      console.error("Error during checkout:", error);
    }
  };

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    const loadScriptAndHandlePayment = async () => {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Failed to load Razorpay SDK. Please try again later.", {
          position: "top-center",
        });
      }
    };

    loadScriptAndHandlePayment();
  }, []);

  if (cart.length <= 0)
    return (
      <>
        <div className="relative md:top-8 flex flex-col justify-center p-10 items-center">
          <div className="flex flex-col md:w-[38%]">
            <img src={EmptyCartPng} alt="empty cart" />
            <Link to="/">
              {EmptyCartPng && <button className="bg-blue-600 w-full text-white p-5 rounded-lg font-semibold">
                Go to Home Page
              </button>}
            </Link>
          </div>
        </div>
      </>
    );

  return (
    <div className="flex justify-center my-24">
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full justify-center items-center">
          <h1 className="text-xl font-bold border-b-2 w-full pb-3">
            CART & CHECKOUT
          </h1>
          <span
            className="text-xl font-bold border-b-2 pb-3 text-nowrap hover:text-red-600"
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
          <div className="mt-5">
            <h2 className="text-lg font-semibold">Select Payment Method:</h2>
            <div className="flex flex-col mt-3">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">Online Payment</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">Cash on Delivery</span>
              </label>
            </div>
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
