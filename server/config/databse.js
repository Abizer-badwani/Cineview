import mongoose from 'mongoose'

try {
    mongoose.connect('mongodb://127.0.0.1/CineView')
} catch (error) {
    console.log(error.message)
}
