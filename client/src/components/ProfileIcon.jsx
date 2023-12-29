import React from 'react'

const ProfileIcon = ({user}) => {
  return (
      <div className='profile-icon'>
          {user?.charAt(0)}
    </div>
  )
}

export default ProfileIcon