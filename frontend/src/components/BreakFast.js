import React from 'react'

export default function BreakFast({data, price}) {
    const {description, img, title, veg } = data || "default";
  return (
    <div>
        <div className="w-[300px] md:w-[700px] flex md:gap-20 justify-between">
            <div className="w-[475px] flex flex-col gap-1">
              {veg === true ? (
                <span className="text-green-600 text-md md:text-2xl text-md font-semibold w-max rounded-xl">
                  <i className="fa-regular fa-circle-stop"></i>
                </span>
              ) : (
                <span className="text-red-800 text-md md:text-2xl font-semibold w-max rounded-xl text-nowrap text-ellipsis">
                  <i className="fa-regular fa-circle-stop"></i>
                </span>
              )}
              <span className="md:text-xl text-md text-gray-700 font-bold text-nowrap">{title} </span>
              <span className="md:text-lg text-xs font-semibold ">RS. {price} ₹</span>
              <span className="text-gray-500 text-sm md:text-lg">{description}</span>
            </div>
            <div className='h-28 w-28 md:h-28 md:w-36'>
              <p
                className="h-20 w-28 md:h-28 md:w-36 bg-cover bg-center rounded-xl"
                style={{ backgroundImage: `url(${img})` }}
              ></p>
            </div>
          </div>
    </div>
  )
}
