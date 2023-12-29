import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import './css/Movielist.css'

const MovieList = () => {

  const getMovies = async () => {
    const { data } = await axios.get('http://localhost:6767/movie/all')
    return data
  }
    const {isLoading, data} = useQuery('movie-list', getMovies)
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(data)
  return (
    <div className='movie-list'>
      {
        data?.movies?.map((movie, ind) => {
          return (
            <div key={movie._id}>
              <span> { ind + 1}</span>
        <span className='movie-name'>{movie?.title}</span>
            </div>
          )
        })
      }
        </div>
  )
}

export default MovieList