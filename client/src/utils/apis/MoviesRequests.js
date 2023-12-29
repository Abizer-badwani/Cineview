import axios from 'axios'
import toast from 'react-hot-toast'

const GetAllMovies = async () => {
    try {
        const { data } = await axios.get('http://localhost:6767/movie/all')
        return data
    } catch (error) {
        console.log(error.message)
        toast.error('Network Error!')
    }
}

const GetMovie = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:6767/movie/${id}`)
        return data.single
        
    } catch (error) {
        console.log(error.message)
        toast.error('Network Error!')
    }
}

export {GetAllMovies, GetMovie}