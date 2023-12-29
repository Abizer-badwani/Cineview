import movie_model from '../models/Movies.js'

const getAllMovies = async (req, res) => {
    try {
        const movies = await movie_model.find({}).populate('reviews')
        return res.json({ success: true, movies })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

const getThumbnail = (req, res) => {
    res.json({ success: true, message: "Thumbnail Uploaded!", thumbnail: req.file })
}

const getTrailer = (req, res) => {
    res.json({ success: true, message: "Trailer Uploaded!", trailer: req.file })
}

const createMovie = async (req, res) => {
    try {
        const { title, desc, cast, trailer, thumbnail, date, director, producer, category } = req.body

        const new_movie = await movie_model.create({ title, desc, thumbnail, trailer, cast, category, releaseYear: date, director, producer })
        return res.json({ success: true, message: 'Movie Created!' })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.body
        const deleted = await movie_model.deleteOne({ _id: id })
        res.json({ success: true, message: "Movie Deleted!" })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

const updateMovie = async (req, res) => { }

const getMovie = async (req, res) => {
    try {
        const { movie } = req.params

        const single = await movie_model.findOne({ _id: movie }).populate('cast').populate({path: 'reviews', populate: {path: 'user'}})
        return res.json({ success: true, single })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

export { getAllMovies, getMovie, createMovie, deleteMovie, updateMovie }
export { getThumbnail, getTrailer }