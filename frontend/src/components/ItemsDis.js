import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisItems from "./DisItems";
import { FETCH_URL } from "../utils/Constants";

export default function ItemsDis() {
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(true); // Define toggle state
  const [chevron, setChevron] = useState("down"); // Define chevron state
  
  const {id} = useParams();
  // console.log(id);
  
  const getDishes = async () => {
    const response = await fetch(`${FETCH_URL}/maindish`);
    const data = await response.json();
    // console.log(data );
    // Initialize count for each item
    const itemsWithCount = data.map((item) => ({ ...item, count: 0 }));
    setItems(itemsWithCount);
    if(id==="maindish"){
      const filtedData = data.filter((item)=> item.category === "Main Course")
      setItems(filtedData)
    }
    else if(id === "breakfast"){
      const filtedData = data.filter((item)=> item.category === "Break fast")
      setItems(filtedData)
    }
    else if(id === "desserts"){
      const filtedData = data.filter((item)=> item.category === "Desserts")
      setItems(filtedData)
    }
    else if(id === "bevrage"){
      const filtedData = data.filter((item)=> item.category === "Beverage")
      setItems(filtedData)
    }
  };
  
  // const incrementCount = (index) => {
  //   setItems((prevItems) =>
  //     prevItems.map((item, i) =>
  //       i === index ? { ...item, count: Math.min(5, item.count + 1) } : item
  //     )
  //   );
  // };

  // const decrementCount = (index) => {
  //   setItems((prevItems) =>
  //     prevItems.map((item, i) =>
  //       i === index ? { ...item, count: Math.max(0, item.count - 1) } : item
  //     )
  //   );
  // };

  const handleOnClick = () => {
    // console.log("clicked");
    setToggle((prevToggle) => !prevToggle);
    setChevron((prevChevron) => (prevChevron === "down" ? "up" : "down"));
  };
  
  useEffect(() => {
    getDishes();
  }, [id]);

  return (
    <div className="w-[100%] md:w-full flex justify-center mt-5 md:p-4">
      <div className="flex flex-col gap-5 shadow-md p-6 rounded-lg">
        <div
          className="md:w-[700px] flex items-center justify-between border-b-2"
          onClick={handleOnClick}
        >
          <span className="text-2xl font-bold">{items[0]?.category}</span>
          <i className={`fa-solid fa-chevron-${chevron} font-bold pr-6`}></i>
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
