import bcryptjs from 'bcryptjs'
import user_model from '../models/User.js'
import profile_model from '../models/Profile.js'
import ticket_model from '../models/Ticket.js'
import jwt from 'jsonwebtoken'


const signupUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body

        if (!firstName) { return res.json({ success: false, message: "Enter First Name!" }) }
        if (!lastName) { return res.json({ success: false, message: "Enter Last Name!" }) }
        if (!email) { return res.json({ success: false, message: "Enter Email!" }) }
        if (!password) { return res.json({ success: false, message: "Enter Password!" }) }
        if (!confirmPassword) { return res.json({ success: false, message: "Enter Confirm Password!" }) }

        if (password != confirmPassword) { return res.json({ success: false, message: "Password Not Match!" }) }

        const existingUser = await user_model.findOne({ email })
        if (existingUser) { return res.json({ success: false, message: "User is already register" }) }

        const salt = bcryptjs.genSaltSync(10)
        const hashedPassword = bcryptjs.hashSync(password, salt)

        const ticket = await ticket_model.create({count: 3})
        const profile = await profile_model.create({ticket: ticket._id})

        const new_user = await user_model.create({ firstName, lastName, email, password: hashedPassword, profile: profile._id, ticket: ticket._id })

        const token = jwt.sign({ id: new_user._id }, "IAMABIZER")

        return res.cookie("token", token, { httpOnly: true }).json({ success: true, message: "User Registered!", user: new_user })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if(!email){return res.json({success: false, message: 'Enter Email!'})}
        if(!password){return res.json({success: false, message: 'Enter Password!'})}


        const is_user_exists = await user_model.findOne({ email })
        if (!is_user_exists) { return res.json({ success: false, message: 'User Not Found!' }) }

        const match = bcryptjs.compareSync(password, is_user_exists.password)
        if (!match) { return res.json({ success: false, message: 'Incorrect Password!' }) }

        const token = jwt.sign({ id: is_user_exists._id }, "IAMABIZER")

        return res.cookie("token", token, { httpOnly: true }).json({ success: true, message: 'Login Successful!', user: is_user_exists })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

const logoutUser = async (req, res) => { 
    return res.clearCookie('token').json({success: true, message: 'Logout Successfull!'})
}


const getProfile = async (req, res) => {
    try {
        const { _id } = req.user

        const profile = await user_model.findOne({ _id }).populate({path: 'profile', populate: {path: 'ticket'}})
        return res.json({ success: true, profile })
    }
    catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal Server Error!' })

    }
}

export { signupUser, loginUser, logoutUser, getProfile }
