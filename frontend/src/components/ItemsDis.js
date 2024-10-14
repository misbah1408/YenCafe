import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisItems from "./DisItems";
import { FETCH_URL } from "../utils/Constants";
import Shimmer from "./Shimmer";
import { createSocketInstance } from "../utils/socket";

export default function ItemsDis() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [chevron, setChevron] = useState("down");
  const [title, setTitle] = useState("");
  const { id } = useParams();

  const getDishes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${FETCH_URL}/maindish`);
      const data = await response.json();

      const itemsWithCount = data.map((item) => ({ ...item, count: 0 }));
      let filteredData = [];
      let newTitle = "";
      switch (id) {
        case "maindish":
          filteredData = itemsWithCount.filter(
            (item) => item.category === "Main Course"
          );
          newTitle = "Main Dishes";
          break;
        case "breakfast":
          filteredData = itemsWithCount.filter(
            (item) => item.category === "Break fast"
          );
          newTitle = "Breakfast";
          break;
        case "desserts":
          filteredData = itemsWithCount.filter(
            (item) => item.category === "Desserts"
          );
          newTitle = "Desserts & Chocolates";
          break;
        case "beverage":
          filteredData = itemsWithCount.filter(
            (item) => item.category === "Beverage"
          );
          newTitle = "Beverages";
          break;
        default:
          filteredData = itemsWithCount;
          newTitle = "Items";
      }
      setTitle(newTitle);
      setItems(filteredData);
    } catch (error) {
      console.error("Failed to fetch dishes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnClick = () => {
    setToggle((prevToggle) => !prevToggle);
    setChevron((prevChevron) => (prevChevron === "down" ? "up" : "down"));
  };

  useEffect(() => {
    getDishes();

    const socket = createSocketInstance();
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("updateData", (updatedData) => {
      // console.log("Updated data:", updatedData);
      setItems((prevItems) =>
        prevItems.map(
          (item) =>
            updatedData.find((updatedItem) => updatedItem._id === item._id) ||
            item
        )
      );
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  if (loading) {
    return (
      <>
        <div className="w-[100%] md:w-full flex justify-center mt-20 md:p-4 flex-col items-center gap-4">
          <Shimmer />
          <Shimmer />
          <Shimmer />
          <Shimmer />
          <Shimmer />
        </div>
      </>
    );
  }

  return (
    <div className="w-[100%] md:w-full flex justify-center mt-20 md:p-4">
      <div className="w-[94%] md:w-[54%] flex flex-col gap-5 shadow-md p-6 rounded-lg">
        <div
          className="md:full flex items-center justify-between"
          onClick={handleOnClick}
        >
          <span className="text-2xl font-bold">{title}</span>
          <i className={`fa-solid fa-chevron-${chevron} font-bold `}></i>
        </div>
        <div className="">
          {toggle &&
            items.map((food) => (
              <div key={food._id} className="flex flex-col pb-5 gap-5">
                <DisItems data={food} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
