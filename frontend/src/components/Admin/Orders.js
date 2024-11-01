import React, { useEffect, useRef, useState } from "react";
import { FETCH_URL, options, token } from "../../utils/Constants";
import { useSelector } from "react-redux";
import { createSocketInstance } from "../../utils/socket";

function Orders() {
  const [orData, setOrData] = useState([]);
  const [date, setDate] = useState();
  const { email } = useSelector((state) => state.user);
  const floor = email.split("").splice(5, 2).join("");
  const floorRef = useRef(floor);
  useEffect(() => {
    floorRef.current = floor; // Keep the ref updated
  }, [floor]);
  const formattedDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", options)
  } 
  const getData = async () => {
    try {
      const response = await fetch(`${FETCH_URL}/orderdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      // console.log(data);

      let filteredData = data.filter((item) =>
        floor === "f6"
          ? item.location === "6th Floor Balmatta"
          : item.location === "4th Floor Balmatta"
      );
      // console.log(filteredData);

      setOrData(filteredData.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const updateDeliveryStatus = async (orderId) => {
    try {
      const response = await fetch(`${FETCH_URL}/order/delivered/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update delivery status");
      } else {
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
    const socket = createSocketInstance();
    socket.on("connect", () => {
      // console.log("Connected to socket server");
    });

    socket.on("updatedOrder", (orders) => {
      // console.log("Orders data:", orders);

      if (!orders || !Array.isArray(orders)) {
        console.error("Received invalid orders data:", orders);
        return;
      }

      const filteredData = orders.filter((item) => {
        const isMatch =
          floorRef.current === "f6"
            ? item.location === "6th Floor Balmatta"
            : item.location === "4th Floor Balmatta";
        return isMatch;
      });

      // console.log("Filtered Data:", filteredData);
      setOrData(filteredData.reverse());
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from socket server", reason);
    });

    return () => {
      socket.disconnect(); 
    };
  }, []);

  if (orData.length <= 0) return null;
  return (
    <div className="container mx-auto py-6 ml-[250px] p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">
                Campus Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">
                Order Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">
                Ordered Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orData.map((order) => {
              return (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                    {order.campusId}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      order.paymentStatus === "Paid"
                        ? "text-green-400"
                        : "text-red-600"
                    } font-semibold border border-gray-200`}
                  >
                    {order.paymentStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                    {formattedDate(order?.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                    {!order.delivered ? (
                      <button
                        onClick={() => updateDeliveryStatus(order._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Mark as Delivered
                      </button>
                    ) : (
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Delivered
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">
                              Item Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">
                              Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order?.orderData?.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                                {item.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                                {(item.price / item.quantity).toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                                {item.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                    {order.total.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
