import React, { useEffect, useState } from "react";
import { options } from "../utils/Constants";
import OrderedItems from "./OrderedItems";

export default function OrderDetail({ data }) {
  const [dateCont, setDateCont] = useState();
  const [orderedDate, setOrderedDate] = useState();
  const [orderData, setOrderData] = useState();
  const [price, setPrice] = useState();
  console.log(data);
  useEffect(() => {
    setDateCont(data.createdAt);
    const date = new Date(dateCont);
    const formattedDate = date.toLocaleString("en-US", options);
    setOrderedDate(formattedDate);
    if (data.orderData) {
      // Set order data
      setOrderData(data.orderData);

      // Calculate total price
      const total = data?.orderData.reduce((acc, item) => acc + item.price, 0);
      setPrice(total);
      console.log(total);
    }
  });
  return (
    <div className="">
      <div className="">
        <div className="flex justify-between">
          <span className="text-lg font-semibold ">{orderedDate}</span>
          <span className="text-md font-semibold text-green-600 border-2 border-green-600 p-1 rounded-lg">
            Delivered
          </span>
        </div>
        {orderData?.map((items) => {
          return (
            <>
              <div key={items.id}>
                <OrderedItems data={items} />
              </div>
            </>
          );
        })}
        <span className="text-lg font-semibold text-gray-500 mt-4">Total  RS.{price}₹</span>
      </div>
    </div>
  );
}
