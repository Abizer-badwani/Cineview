import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../css/Navbar.css'
import {UserState} from '../context/UserContext'
import ProfileIcon from './ProfileIcon'
import {AiFillHeart} from 'react-icons/ai'

const Navbar = () => {

  const { userState} = UserState()

  return (
    <>
      <nav>
          <h1>Cineview</h1>
          <ul className='auth'>
        {
          userState ? 
            <>
              <li className='ticket-link'><Link to={'/ticket'}>Ticket</Link></li>
              <li className='wishlist-link'><Link to={'/user/wishlist'}><AiFillHeart fill='#cc0099' size={35} /></Link></li>
          <li className='profile-link'> <Link to={'/user/profile'} ><ProfileIcon user={userState?.firstName.toUpperCase()} /></Link></li>
          </>
              :
          <li className='login-link'><Link to={'/auth/login'}>Login</Link></li>
            
        }
          </ul>
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar