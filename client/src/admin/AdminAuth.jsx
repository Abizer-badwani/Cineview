import React from 'react'
import UserForm from '../components/UserForm'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { InvalideAdminCred } from '../utils/queries/AdminQuery'

const AdminAuth = () => {

  const navigate = useNavigate()
  
  const {mutate: adminMutate} = InvalideAdminCred()

  const handleAdminLogin = async (user) => {
    const { data } = await axios.post('http://localhost:6767/admin/login', user)
    
    if (data?.success) {
      adminMutate()
      navigate('/admin/dashboard')
      toast.success(data?.message)
    }
    else {
      toast.error(data?.message)
    }
  }


  return (
    <>
      <UserForm type='Admin' handleAuth={handleAdminLogin}  />
    </>
  )
}

export default AdminAuth