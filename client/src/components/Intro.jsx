import React from 'react'
import '../css/Intro.css'
import logo from '../image/logo.png'
import { useNavigate } from 'react-router-dom'

const Intro = () => {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/movie')
    }

    return (
      <>
      <div className='main-intro'>
              <div className="main-heading">
                  <h1>Lights, Camera, Action, <br/> Let's Watch!</h1>
              </div>
              <img src={logo} alt="" />
            </div>
            <div className='main-button'>
            <button className='explore-movies' onClick={handleClick}>Explore Movies</button>
            </div>
            </>
      
  )
}

export default Intro