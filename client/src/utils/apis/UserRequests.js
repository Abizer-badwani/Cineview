import axios from 'axios'
import toast from 'react-hot-toast'
axios.defaults.withCredentials = true

const SignupUser = async (user) => {
    try {
        const { data } = await axios.post('http://localhost:6767/auth/signup', user)
        console.log(data)
        return data
    } catch (error) {
        console.log(error.message)
        toast.error('Network Error!')
    }
}

const LoginUser = async (user) => {
    try {
        const { data } = await axios.post('http://localhost:6767/auth/login', user)
        return data
    } catch (error) {
        console.log(error.message)
        toast.error('Network Error!')
    }
}

const LogoutUser = async () => {
    try {
        const { data } = await axios.get('http://localhost:6767/auth/logout')
        return data

    } catch (error) {
        console.log(error.message)
        toast.error('Network Error!')
    }
}

const GetProfile = async () => {
    try {
        const { data } = await axios.get('http://localhost:6767/auth/profile')
        return data
    } catch (error) {
        console.log(error.message)
        toast.error('Network Error!')
    }
}
export { SignupUser, LoginUser, GetProfile, LogoutUser }