import React, { useState } from 'react'
import '../css/Auth.css'
import { useNavigate } from 'react-router-dom'

const UserForm = ({ type, handleAuth }) => {

    const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: ''})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleAuth(user)
    }

    return (
        <div className='form-container'>
            <div>
                <h1>{type}</h1>
                <form onSubmit={handleSubmit}>
                    {
                        type === 'Signup' &&
                        <div>
                            <input type="text" name="firstName" id="firstname" onChange={handleChange} placeholder='Enter First name' />
                            <input type="text" name="lastName" id="lastname" onChange={handleChange} placeholder='Enter Last name' />
                        </div>
                    }
                    {
                        type === 'Admin' &&
                    <input type="username" name="username" id="username" onChange={handleChange} placeholder='Enter Admin Username' />
                        
                    }
                    {
                        type === 'Admin' ?
                            null:
                    <input type="email" name="email" id="email" onChange={handleChange} placeholder='Enter Email' />
                    }

                    <input type="password" name="password" id="password" onChange={handleChange} placeholder='Enter Password' />
                    {
                        type === 'Signup' &&
                    <input type="password" name="confirmPassword" id="confirm" onChange={handleChange} placeholder='Confirm Password' />

                    }
                    <button type="submit" className={ type === 'Admin' ? 'admin-login-button' : type === 'Signup' ? 'user-signup-button' : 'user-login-button'}>{type === 'Admin' ? 'Login' : type}</button>
                </form>
                {type === 'Login' && <p onClick={() => navigate('/auth/signup', {replace: true})}>Signup</p>}
            </div>
        </div>
    )
}

export default UserForm