
import express from 'express'
import { addToWishlist, removeFromWishlist } from '../helper/Wishlist.js'
import { verifyUser } from '../middleware/Auth.js'

const router = express.Router()

router.post('/add', verifyUser, addToWishlist)
router.post('/remove', verifyUser, removeFromWishlist)


export default router