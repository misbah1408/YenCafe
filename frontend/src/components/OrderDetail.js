import React, { useEffect, useState } from "react";
import { options } from "../utils/Constants";
import OrderedItems from "./OrderedItems";

export default function OrderDetail({ data }) {
  const [orderedDate, setOrderedDate] = useState("");
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (data) {
      const date = new Date(data.createdAt);
      const formattedDate = date.toLocaleString("en-US", options);
      setOrderedDate(formattedDate);

      if (data.orderData) {
        setOrderData(data.orderData);
      }
    }
  }, [data]);

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <span className="text-lg font-bold">{orderedDate}</span>
        <div className="flex flex-col gap-2">
          <span
            className={`text-md font-semibold border-2 rounded-lg p-1 ${
              data?.delivered ? "text-green-600 border-green-600" : "text-gray-400 border-gray-400"
            }`}
          >
            {data?.delivered ? "Delivered" : "Yet Delivered"}
          </span>
          <span className="text-md font-medium text-center">{data?.paymentStatus}</span>
        </div>
      </div>
      {data?.orderData?.map((item) => (
        <OrderedItems key={item.id} data={item} />
      ))}
      <div className="flex justify-end mt-2">
        <span className="text-lg font-semibold text-gray-500">
          Total: RS. {data?.total?.toFixed(2)} ₹
        </span>
      </div>
    </div>
  );
}
