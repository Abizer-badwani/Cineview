import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

export default new mongoose.model('Reviews', reviewSchema)
