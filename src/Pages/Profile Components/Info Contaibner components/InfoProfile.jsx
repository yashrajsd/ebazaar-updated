import React from 'react'
import './InfoProfile.scss'
const InfoProfile = ({user}) => {
  return (
    <div className='infoProfile-container'>
        <p>Profile Settings</p>
        <h1>{user?.name}</h1>
    </div>
  )
}

export default InfoProfile