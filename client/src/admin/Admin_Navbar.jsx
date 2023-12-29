import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminState } from '../context/AdminContext'

import './css/Navabr.css'

const Admin_Navbar = () => {
  const {adminState} = AdminState()
  
    return (
      <>
        <div className='admin-navbar'>
          <h1>admin</h1>
          <div className="admin-profile-link">
            {adminState?.username?.charAt(0)}
          </div>
    </div>
    <Outlet />
      </>
    )

}

export default Admin_Navbar
