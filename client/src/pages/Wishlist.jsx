import React from 'react'
import { UserState } from '../context/UserContext'
import Movie from '../components/Movie'
import { UseMovie } from '../context/MovieContext'
import '../css/Wishlist.css'


const Wishlist = () => {

  const { userState } = UserState()
  const { movieState } = UseMovie()
  
  const filter = movieState?.filter((movie) => userState?.profile?.wishlist.some((a) => a === movie._id))

    console.log(filter)

  return (
    <>
      <h1 className='wishlist-heading'>
        wishlist
      </h1>
        {
          filter.length ?
    <div className='wishlist-container'>
            {filter?.map((movie) => {
              return <Movie key={movie._id} data={movie} />
            })}
      </div>
            :
            <div className="empty-wishlist">
              nothing in  your wish ! 
          </div>

      }
      
    </>
  )
}

export default Wishlist