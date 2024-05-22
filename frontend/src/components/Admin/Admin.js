import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

export default function Admin() {
  return (
    <div className='flex'>
      <SideBar/>
      <Outlet/>
    </div>
  )
}
