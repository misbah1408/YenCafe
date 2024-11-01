import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisItems from "./DisItems";
import { FETCH_URL } from "../utils/Constants";
import Shimmer from "./Shimmer";
import { createSocketInstance } from "../utils/socket";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ItemsDis() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [chevron, setChevron] = useState("down");
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const location = useSelector((state) => state.location);

  const getDishes = async () => {
    setLoading(true);
    try {
      if (!location) {
        toast.warning("Location is required!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      const response = await fetch(`${FETCH_URL}/maindish`);
      const data = await response.json();

      const filteredWithLocation = data.filter((item) =>
        location === "4th Floor Balmatta"
          ? item.floor === "fourth floor"
          : item.floor === "sixth floor"
      );
      let filteredData = [];
      let newTitle = "";
      switch (id) {
        case "maindish":
          filteredData = filteredWithLocation.filter(
            (item) => item.category === "Main Course"
          );
          newTitle = "Main Dishes";
          break;
        case "breakfast":
          filteredData = filteredWithLocation.filter(
            (item) => item.category === "Break fast"
          );
          newTitle = "Breakfast";
          break;
        case "desserts":
          filteredData = filteredWithLocation.filter(
            (item) => item.category === "Desserts"
          );
          newTitle = "Desserts & Chocolates";
          break;
        case "beverage":
          filteredData = filteredWithLocation.filter(
            (item) => item.category === "Beverage"
          );
          newTitle = "Beverages";
          break;
        default:
          filteredData = filteredWithLocation;
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
      // console.log("Connected to socket server");
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
      // console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, [id, location]);

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
    <>
      {items && <div className="w-[100%] md:w-full flex justify-center mt-20 md:p-4">
        <div className="w-[94%] lg:w-[59%] md:w-[100%] flex flex-col gap-5 shadow-md p-6 rounded-lg">
          <div
            className="md:w-full lg:w-full flex items-center justify-between"
            onClick={handleOnClick}
          >
            <span className="text-2xl font-bold">{title}</span>
            <i className={`fa-solid fa-chevron-${chevron} font-bold `}></i>
          </div>
          <div className=" w-full">
            {toggle &&
              items.map((food) => (
                <div
                  key={food._id}
                  className=" w-full flex flex-col pb-5 gap-5"
                >
                  <DisItems data={food} />
                </div>
              ))}
          </div>
        </div>
      </div>}
      <ToastContainer />
    </>
  );
}
