import React from 'react'

export default function DisFood({data}) {
    // console.log(data)
    const {img, name, options} = data 
  return (
    <div className='flex flex-col gap-3'>
        <div>
            <p className='h-44 w-64 bg-cover bg-center rounded-xl' style={{ backgroundImage: `url(${img})` }}></p>
        </div>
        <div className='flex flex-col'>
            <span className='text-lg font-semibold'>{name}</span>
            <span className='text-xs font-semibold'>RS. {options[0].half || options[0].regular} ₹</span>
        </div>
    </div>
  )
}
