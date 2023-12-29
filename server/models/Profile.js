
import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({

    gender: {
        type: String,
        default: null
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    contact: {
        type: Number,
        default: null
    },
    wishlist: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie'
            }
        ]
    },
    purchased: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie'
            }
        ]
    },
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
})

export default new mongoose.model('Profile', profileSchema)