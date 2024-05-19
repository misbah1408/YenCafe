import React, { useEffect, useState } from "react";
import { token } from "../utils/Constants";

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
      console.log(data)
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
            <ul>
              {order.orderData.map((item, index) => (
                <li key={index}>
                  <p>Item: {item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
