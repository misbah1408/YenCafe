import React from 'react'
import Categories from './Categories'
import Dishes from './Dishes'
import Footer from './Footer'

export default function Home() {
  return (
    <div className='flex flex-col gap-10 items-center'>
        <Categories/>
        <Dishes/>
        <Footer/>
    </div>
  )
}
