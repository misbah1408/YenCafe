import React from "react";
import "../index.css";

export default function Shimmer() {
  return (
    <div className="md:w-[700px] w-[80%] flex md:gap-20 gap-3 mt-6">
      <div className="shimmer h-[80px] md:h-[120px] w-[80%] bg-gray-200 md:w-[475px] flex flex-col gap-1 rounded-xl"></div>
      <div className="shimmer h-[80px] md:h-[120px] w-[20%] md:w-36 bg-gray-200 rounded-xl"></div>
    </div>
  );
}
