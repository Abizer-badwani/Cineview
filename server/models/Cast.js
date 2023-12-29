
import mongoose from "mongoose";

const castSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

export default new mongoose.model('Cast', castSchema)

