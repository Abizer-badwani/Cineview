import user_model from '../models/User.js'
import profile_model from '../models/Profile.js'
import ticket_model from '../models/Ticket.js'

const purchaseMovie = async (req, res) => {
    try {
        const { _id } = req.user
        const { movieId } = req.body

        const user = await user_model.findOne({ _id }).populate({ path: 'profile', populate: {path: 'ticket'}})
        const ticket = await ticket_model.findOne({ _id: user.profile.ticket })
        
        if (!ticket.count) {
            return res.json({success: false, message: 'Ticket Not Available!'})
        }
        
        const dec = await ticket_model.findOneAndUpdate({_id: ticket._id}, {$inc: {'count': -1}}, {new: true})
        const profile = await profile_model.findOneAndUpdate({ _id: user.profile }, { $push: { 'purchased': movieId }, $pull: { 'wishlist': movieId } }, { new: true })

        return res.json({ success: true, message: 'Movie added to your Purchased.' })
    }
    catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal Server Error!' })
    }
}

export { purchaseMovie }