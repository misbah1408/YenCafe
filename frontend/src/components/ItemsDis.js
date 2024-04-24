import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisItems from "./DisItems";

export default function ItemsDis() {
  const [items, setItems] = useState([]);
  const param = useParams();
  console.log(param.id);

  const getDishes = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/${param.id}`);
    const data = await response.json();
    console.log(data[0]);
    setItems(data[0]);
  };
  const handleOnClick = () => {
    console.log("clicked");
  };
  useEffect(() => {
    getDishes();
  }, [param.id]);

  return (
    <div className=" flex justify-center mt-5">
      <div onClick={handleOnClick} className="flex flex-col gap-5">
        {items?.map((food) => (
            <DisItems key={food._id} data={food} />
        ))}
      </div>
    </div>
  );
}
