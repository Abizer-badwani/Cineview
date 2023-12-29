import cast_model from '../models/Cast.js'

const getCast = async (req, res) => {
    try {
        const casts = await cast_model.find({})
        res.json({ success: true, casts })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

const createCast = async (req, res) => {
    try {
        const { name, image } = req.body

        const create = await cast_model.create({ name, image })
        res.json({ success: true, message: "Cast Added!" })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

const getProfile = (req, res) => {
    try {
        res.json({ success: true, profile: req.file })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: 'Internal Server Error!' })
    }
}

export { getCast, createCast, getProfile }