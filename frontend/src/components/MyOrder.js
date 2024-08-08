import React, { useEffect, useState } from "react";
import { FETCH_URL, emptyCart, token } from "../utils/Constants";
import OrderDetail from "./OrderDetail";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }
    

    try {
      const response = await fetch(`${FETCH_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch orders");
        return;
      }

      const data = await response.json();
      const reversedArr = data.reverse(); 
      // console.log(reversedArr);
      setOrders(reversedArr);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  },[]);
  if(orders.length===0){
    return(
      <div className="flex flex-col justify-center items-center p-5 md:mt-10 mt-20 bg-[#fdfdfd]">
        <img className="w-[1000%] md:w-[30%]" src={emptyCart} alt="" />
        <span className="text-xl font-semibold mt-7 md:mt-5">No Orders</span>
        <span>You haven't placed any order yet.</span>
      </div>
    );
  }
  return (
    <div className="flex justify-center mt-20">
      <div className="mt-5 md:w-[50%] w-[95%]">
        <h1 className="text-xl font-bold border-b-2 border-gray-200 pb-3">Orders History</h1>
        <div>
          {orders?.map((item) => { return (
            <div key={item._id} className="relative mt-3 py-3 border-b-2 border-gray-200">
              <OrderDetail data={item} />
              <span className="absolute -top-2 right-4 bg-slate-100 p-1 text-[10px] md:text-[15px] border-2 border-gray-300 rounded-lg">{item.location}</span>
            </div>);
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
