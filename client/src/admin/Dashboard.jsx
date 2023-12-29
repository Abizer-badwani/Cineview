import React from 'react'
import {useNavigate} from 'react-router-dom'
import './css/Dashboard.css'

const Dashboard = () => {

const navigate = useNavigate()

  return (
    <div className='dashboard'>
      <div className="movies">
        <div className="movies-brief">
          <h1>Total movies</h1>
          <p></p>
        </div>
        <div className="get-all-movies-link" onClick={() => navigate('/admin/dashboard/movies')}>
          Movie List
        </div>
        <div className="create-movie" onClick={() => navigate('/admin/dashboard/movie/create')}>
          Create movie
        </div>
      </div>
      <div className="users">
        <div className="user-brief">
          <h1>Total Users</h1>
          <p>5</p>
        </div>
        <div className="user-list">
          user list
        </div>
      </div>
      <div className="cast">
        <div className="cast-brief">
          <h1>Total actors</h1>
          <p>25</p>
        </div>
        <div className="actor-list">
          actor list
        </div>
        <div className="create-actor">
          create actor
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard