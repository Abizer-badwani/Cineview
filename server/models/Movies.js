import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({ 
    title:{
        type:String,
        required: true
    },
    desc:{
        type:String,
        required:true,
        trim:true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    cast: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cast'
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reviews'
        }
    ],
    releaseYear: {
        type: Date,
        required: true
    },
    director: {
        type: String,
    },
    producer: {
        type: String
    }
},{
    timestamps: true
})

export default mongoose.model("Movie", movieSchema)