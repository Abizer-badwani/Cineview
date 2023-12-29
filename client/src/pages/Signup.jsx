import React from 'react'
import UserForm from '../components/UserForm'
import {SignupUser} from '../utils/apis/UserRequests'
import {useNavigate} from 'react-router-dom'
import { InValidCredentials } from '../utils/queries/UserQuery'
import toast from 'react-hot-toast'

const Signup = () => {

  const navigate = useNavigate()
  const { mutate: userMutate } = InValidCredentials()
  
  const handleSignup = async (user) => {
    const data = await SignupUser(user)
 
    if (data?.success) {
      userMutate()
      toast.success(data?.message)
      navigate('/', {replace: true})
    }
    else {
      toast.error(data?.message)
    }
  }

  return (
    <>
      <UserForm type={'Signup'} handleAuth={handleSignup} />
    </>
  )
}

export default Signup