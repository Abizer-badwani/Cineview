
import jwt from 'jsonwebtoken'
import user_model from '../models/User.js'
import admin_model from '../models/Admin.js'

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) { return res.json({ success: false }) }
        const { id } = jwt.verify(token, "IAMABIZER")

        const user = await user_model.findOne({ _id: id })
        if (!user) { return res.json({ success: false }) }

        req.user = user._id
        return next()
    }
    catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

const verifyAdmin = async (req, res, next) => {
    try {
        const admin = req.cookies.admin

        if (!admin) { return res.json({ success: false }) }

        const { id } = jwt.verify(admin, "IAMADMIN")

        const is_admin = await admin_model.findOne({ _id: id })
        if (!is_admin) { return res.json({ success: false }) }

        req.admin = is_admin._id
        return next()
    }
    catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

export { verifyUser, verifyAdmin }
