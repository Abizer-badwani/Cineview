import React from 'react'
import UserForm from '../components/UserForm'
import {LoginUser} from '../utils/apis/UserRequests'
import { InValidCredentials } from '../utils/queries/UserQuery'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {

  const { mutate: userMutate } = InValidCredentials()
  const navigate = useNavigate()

  const handleLogin = async (user) => {
    const data = await LoginUser(user)

    if (data.success) {
      userMutate()
      toast.success(data?.message)
      navigate('/', { replace: true })
    }
    else {
      toast.error(data?.message)
    }
  }

  return (
    <>
      <UserForm type={'Login'} handleAuth={handleLogin} />
    </>
  )
}

export default Login