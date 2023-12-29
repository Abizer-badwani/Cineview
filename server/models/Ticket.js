import mongoose from 'mongoose'

const ticketSchema = mongoose.Schema({
    count: {
        type: Number,
        default: 0
    }
})

export default new mongoose.model('Ticket', ticketSchema)