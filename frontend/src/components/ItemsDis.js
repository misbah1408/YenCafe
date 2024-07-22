import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisItems from "./DisItems";
import { FETCH_URL } from "../utils/Constants";
import Shimmer from "./Shimmer";

export default function ItemsDis() {
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(true); // Define toggle state
  const [chevron, setChevron] = useState("down"); // Define chevron state
  const [title, setTitle] = useState("")
  
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
      setTitle("Main Dishe's")
      setItems(filtedData)
    }
    else if(id === "breakfast"){
      const filtedData = data.filter((item)=> item.category === "Break fast")
      setTitle("Break Fast")
      setItems(filtedData)
    }
    else if(id === "desserts"){
      const filtedData = data.filter((item)=> item.category === "Desserts")
      setTitle("Desserts & Chocolates")
      setItems(filtedData)
    }
    else if(id === "bevrage"){
      const filtedData = data.filter((item)=> item.category === "Beverage")
      setTitle("Beverages")
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
  if(!items){
    return <div><Shimmer/></div>
  }else{
  return (
    <div className="w-[100%] md:w-full flex justify-center mt-20 md:p-4">
      <div className="w-[94%] md:w-[54%] flex flex-col gap-5 shadow-md p-6 rounded-lg">
        <div
          className="md:full flex items-center justify-between "
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
  );}
}
