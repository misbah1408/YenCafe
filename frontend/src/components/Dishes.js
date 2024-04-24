import React, { useEffect, useState } from "react";
import DisFood from "./DisFood";

export default function Dishes() {
  const [dishes, setDishes] = useState([]);

  const getDishes = async () => {
    const response = await fetch("http://localhost:5000/api/v1/fooditems");
    const data = await response.json();
    // console.log(data[0]);
    setDishes(data[0]);
  };

  useEffect(() => {
    getDishes();
  }, []);

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <span className="text-xl font-bold text-start">For You</span>
      <div className="w-[70%] flex flex-wrap justify-center gap-16 items-center">
        {dishes?.map((dish) => (
          <div key={dish._id} className="hover:translate-y-2">
            <DisFood data={dish} />
          </div>
        ))}
      </div>
    </div>
  );
}
