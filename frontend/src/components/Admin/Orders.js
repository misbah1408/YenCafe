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
    return d.toLocaleString("en-US", options);
  };
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
              {[
                "Campus ID",
                "Payment Status",
                "Order Date",
                "Order Status",
                "Ordered Items",
                "Total",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orData.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                {/* Campus ID */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                  {order.campusId}
                </td>

                {/* Payment Status */}
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                    order.paymentStatus === "Paid"
                      ? "text-green-400"
                      : "text-red-600"
                  } border border-gray-200`}
                >
                  {order.paymentStatus}
                </td>

                {/* Order Date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                  {formattedDate(order.updatedAt)}
                </td>

                {/* Order Status */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                  <button
                    onClick={() => updateDeliveryStatus(order._id)}
                    className={`font-bold py-2 px-4 rounded ${
                      order.delivered
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-blue-500 hover:bg-blue-700"
                    } text-white`}
                    disabled={order.delivered}
                  >
                    {order.delivered ? "Delivered" : "Mark as Delivered"}
                  </button>
                </td>

                {/* Ordered Items */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-50">
                        <tr>
                          {["Item Name", "Price", "Quantity", "Total"].map(
                            (itemHeader) => (
                              <th
                                key={itemHeader}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200"
                              >
                                {itemHeader}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.orderData.map((item) => (
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

                {/* Total */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                  {order.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
