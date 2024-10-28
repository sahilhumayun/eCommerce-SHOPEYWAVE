import Navbar from '../navbar/Navbar'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import MyState from '../../Context/MyState'
import { Toaster } from 'react-hot-toast'


function Layout() {
  return (
    <>
      <MyState>
        <Navbar />
        <Outlet />
        <Toaster/>
      </MyState>
    </>
  )
}
export default Layout
