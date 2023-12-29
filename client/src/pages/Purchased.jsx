import React from 'react'
import { UseMovie } from '../context/MovieContext'
import { UserState } from '../context/UserContext'
import '../css/Purchased.css'

const Purchased = () => {

  const { movieState } = UseMovie()
  const { userState } = UserState()
  
  const purchase = movieState?.filter((movie) => userState?.profile?.purchased.some(a => a === movie._id))

  return (
    <div>
      <h1 className='purchased-heading'>Purchased</h1>
      <div className="purchased-container">
        {
          purchase.map(({trailer, _id, title}) => {
            return <div className="trailer-container">
            <video key={_id} src={`http://localhost:6767/trailers/${trailer}`} controls />
              <p>{title}</p> 
              </div>
          })
        }
      </div>
    </div>
  )
}

export default Purchased