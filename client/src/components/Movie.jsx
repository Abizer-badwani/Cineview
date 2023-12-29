import React from 'react'
import '../css/MovieContainer.css'
import Ratings from './Ratings'
import {useNavigate} from 'react-router-dom'

const Movie = ({ data: { _id, title, thumbnail, reviews } }) => {
  
  const rating = Math.floor((reviews.reduce((accumulator, {rating}) => accumulator + rating, 0))/(reviews.length))

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/movie/${_id}`)
  }

  return (
    <div className='movie-container' onClick={handleNavigate}>
      <img src={`http://localhost:6767/thumbnails/${thumbnail}`} />
      <div className="details">
        <h1>{title}</h1>
        <p>{ }</p>
        <div className="rating">
          <Ratings rate={rating} starClick={null} />
        </div>
      </div>
    </div>
  )
}

export default Movie