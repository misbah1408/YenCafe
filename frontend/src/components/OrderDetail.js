import React, { useEffect, useState } from "react";
import { options } from "../utils/Constants";
import OrderedItems from "./OrderedItems";

export default function OrderDetail({ data }) {
  const [orderedDate, setOrderedDate] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (data) {
      const date = new Date(data.createdAt);
      const formattedDate = date.toLocaleString("en-US", options);
      setOrderedDate(formattedDate);
      // console.log(formattedDate);

      if (data.orderData) {
        setOrderData(data.orderData);
        const total = data.orderData.reduce((acc, item) => acc + item.price, 0);
        setPrice(total);
        // console.log(total);
      }
    }
  }, [data]);

  return (
    <div className="">
      <div className="relative">
        <div className="flex justify-between">
          <span className="text-lg font-bold"> <i className="fa-solid fa-chevron-right pr-3 text-gray-400"></i>{orderedDate}</span>
          <span className="text-md font-semibold text-green-600 border-2 border-green-600 p-1 rounded-lg">
            Delivered
          </span>
        </div>
        {orderData.map((items) => (
          <div key={items.id}>
            <OrderedItems data={items} />
          </div>
        ))}
        <span className="text-lg font-semibold text-gray-500 ml-7 absolute bottom-1 right-3 s">
          <span className="text-lg font-bold text-black">Total</span> RS.{price}₹
        </span>
      </div>
    </div>
  );
}
