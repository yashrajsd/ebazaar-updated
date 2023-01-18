import React from 'react'
import './Auth.scss'
const Auth = () => {
  return (
    <div className='auth-container'>
        <div className='div-1'>
            <h1>Sign Up</h1>
            <div className='border'>
                
            </div>
            <form action="submit">
                    <div className='name'>
                        <input type="text" name='Firstname' placeholder='First Name'/>
                        <input type="text" name='Lastname' placeholder='Last Name'/>
                    </div>
                    <input type="email" placeholder='Email Address' />
            </form>
        </div>
        <div className='div-2'>

        </div>
    </div>
  )
}

export default Auth