import ticket_model from '../models/Ticket.js'
import user_model from '../models/User.js'


const createTicket = async (req,res) => {
    try {
        const { _id } = req.user
        const { count } = req.body
        
        const user = await user_model.findOne({_id})

        const ticket = await ticket_model.findOneAndUpdate({ _id: user.profile.ticket }, {$inc : {'count': count}})

        return res.json({success: true, message: "Ticket Purchased Successfully!"})
    }
    catch (error) {
        console.log(error.message)
        res.json({success: false, message: "Internal Server Error!"})
    }
}

export {createTicket}