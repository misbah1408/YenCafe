import React from "react";
import "../index.css"

export default function Shimmer() {
  return (
    <div className="w-[700px] flex gap-20">
      <div className="shimmer h-[120px] bg-gray-200 w-[475px] flex flex-col gap-1 rounded-xl"></div>
      <div>
        <p className="shimmer h-28 w-36 bg-gray-200 rounded-xl"></p>
      </div>
    </div>
  );
}
