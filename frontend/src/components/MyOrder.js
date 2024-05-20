import React, { useEffect, useState } from "react";
import { token } from "../utils/Constants";
import OrderDetail from "./OrderDetail";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }
    

    try {
      const response = await fetch("http://localhost:5000/api/v1/orders", {
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
      // console.log(data);
      setOrders(reversedArr);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="mt-5 w-[50%]">
        <h1 className="text-xl font-bold border-b-2 border-gray-200 pb-3">Orders History</h1>
        <div>
          {orders?.map((item) => { return(
            <div key={item._id} className="mt-3 py-3 border-b-2 border-gray-200">
              <OrderDetail data={item} />
            </div>);
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
