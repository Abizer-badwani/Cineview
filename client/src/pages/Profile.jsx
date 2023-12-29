import React from 'react'
import '../css/Profile.css'
import { UserState } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { LogoutUser } from '../utils/apis/UserRequests'


const Profile = () => {

  const { userState, userDispatch } = UserState()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const data = await LogoutUser()

      if (data?.success) {
        userDispatch({ type: 'LOGOUT' })
        navigate('/')
        toast.success(data?.message)
      }
      else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="profile-heading">Profile</div>
      <div className='profile-container'>

        <div className="container-one">
          <div className="profile-fullname">
            <span>Name</span>
            <input type='text' value={userState?.firstName + ' ' + userState?.lastName} disabled />
          </div>
          <div className='profile-email'>
            <span>Email</span>

            <input type="text" value={userState?.email} disabled />
          </div>
          <div className='profile-gender'>
            <span>Gender</span>

            {
              userState?.profile?.gender
                ?
                <select name="" id="" disabled>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
                :
                <div className="dash">-</div>
            }
          </div>
          <div className="profile-contact">
            <span>Contact</span>

            {
              userState?.profile?.contact ?
                <input type="number" value={userState?.contact} disabled />
                :
                <div className="dash">-</div>
            }
          </div>

          <div className="profile-ticket">
            <span>Tickets</span>
            <p>{userState?.profile?.ticket?.count}</p>
          </div>

          <div className="profile-buttons">
            <button className='my-movies' onClick={() => navigate('/user/purchased')}>my movies</button>
          </div>

          <div className="logout-button"><button onClick={handleLogout}>logout</button></div>
        </div>
        <div className="container-two">
          <div className="profile-image">
            {userState?.firstName?.charAt(0)}
          </div>
        </div>

      </div>
    </>
  )
}

export default Profile