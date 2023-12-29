
import review_model from '../models/Reviews.js'
import movie_model from '../models/Movies.js'

const createReview = async (req, res) => {
    try {
        const { _id } = req.user
        const { movieId, rating, message } = req.body

        const create = await review_model.create({ user: _id, movieId, message, rating })

        const updated = await movie_model.findByIdAndUpdate({ _id: movieId }, { "$push": { "reviews": create._id } }, { new: true })

        return res.json({ success: true, message: "Review Created!" })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

//Not implemented..... 
const deleteReview = async (req, res) => {
    try {
        const { _id } = req.user
        const { movieId, reviewId } = req.body

        const deleted = await review_model.deleteOne({ user: _id, movieId: movieId })
        const remove = await movie_model.findOneAndUpdate({_id: movieId}, {$pull: {'reviews' : reviewId}}, {new: true})

        console.log(deleted)
        console.log(remove)

        return res.json({ success: true, message: "Review Deleted!" })

    }
    catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

// const getAllReviews = async (req, res) => { 
//     try {
//         const { movieId } = req.body
        
//         const reviews = await movie_model.findOne({_id: movieId}).select('reviews')

//         res.json(reviews)
//     }
//     catch (error) {
//         console.log(error.message)
//         return res.json({ success: false, message: 'Internal Server Error!' })
//     }
// }

export { createReview, deleteReview }
