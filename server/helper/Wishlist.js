import user_model from '../models/User.js'
import profile_model from '../models/Profile.js'

const addToWishlist = async (req, res) => {

    try {
        const { _id } = req.user
        const { movieId } = req.body

        const user = await user_model.findOne({ _id })
        const profile = await profile_model.findOneAndUpdate({ _id: user.profile }, { $push: { 'wishlist': movieId } }, { new: true })

        res.json({success: true, message: 'Added To Wishlist!'})
    }
    catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Interrnal Serb=ver Error!' })
    }
}

const removeFromWishlist = async (req, res) => {
    try {
        const { _id } = req.user
        const { movieId } = req.body

        const user = await user_model.findOne({ _id })
        const profile = await profile_model.findOneAndUpdate({ _id: user.profile }, { $pull: { wishlist: movieId } }, { new: true })

        res.json({success: true, message: "Remove Successfully!"})
    }
    catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Interrnal Serb=ver Error!' })
    }
}

export { addToWishlist, removeFromWishlist }