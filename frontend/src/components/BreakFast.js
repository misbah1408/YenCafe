import React from 'react'

export default function BreakFast({data, price}) {
    const {description, img, title, veg } = data || "default";
  return (
    <div>
        <div className="w-[700px] flex gap-20 justify-">
            <div className="w-[475px] flex flex-col gap-1">
              {veg === true ? (
                <span className="text-green-600 text-2xl font-semibold w-max rounded-xl">
                  <i className="fa-regular fa-circle-stop"></i>
                </span>
              ) : (
                <span className="text-red-800 text-2xl font-semibold w-max rounded-xl text-nowrap text-ellipsis">
                  <i className="fa-regular fa-circle-stop"></i>
                </span>
              )}
              <span className="text-xl text-gray-700 font-bold">{title} </span>
              <span className="text-md font-semibold">RS. {price} ₹</span>
              <span className="text-gray-500">{description}</span>
            </div>
            <div>
              <p
                className="h-28 w-36 bg-cover bg-center rounded-xl"
                style={{ backgroundImage: `url(${img})` }}
              ></p>
            </div>
          </div>
    </div>
  )
}
