import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import admin_model from '../models/Admin.js'

const AdminSignup = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username) { return res.json({ success: false, message: 'Enter Username!' }) }
        if (!password) { return res.json({ success: false, message: 'Enter Password!' }) }

        const is_admin_exist = await admin_model.findOne({ username })
        if (is_admin_exist) { return res.json({ success: false, message: 'Admin Already Exist!' }) }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const create = await admin_model.create({ username, password: hash })

        const token = jwt.sign({ id: create._id }, "IAMADMIN")

        res.cookie('admin', token).json({ success: true, message: 'Signup Success!' })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

const AdminLogin = async (req, res) => {
    try {
        const { username, password } = req.body
    if (!username) { return res.json({ success: false, message: 'Enter Username!' }) }
    if (!password) { return res.json({ success: false, message: 'Enter Password!' }) }

    const is_admin_exist = await admin_model.findOne({ username })
    if (!is_admin_exist) { return res.json({ success: false, message: 'Admin Not Found!' }) }

    const match = bcrypt.compareSync(password, is_admin_exist.password)
    if (!match) { return res.json({ success: false, message: 'Incorrect Password!' }) }

    const token = jwt.sign({ id: is_admin_exist._id }, 'IAMADMIN')

    res.cookie('admin', token).json({ success: true, message: 'Login Success!' })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

const getAdminProfile = async (req, res) => {
    try {
        const { _id } = req.admin
        
        const admin = await admin_model.findOne({ _id })

        res.json({success: true, admin})

    }
    catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

const AdminLogout = () => {
    try {
        res.json({ success: true, message: 'Logout Successfull!' })
    
    } 
    catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}


export { AdminSignup, AdminLogin, getAdminProfile, AdminLogout}