
import express from 'express'
import { loginUser, logoutUser, signupUser, getProfile } from '../controllers/Auth.js'
import { verifyUser } from '../middleware/Auth.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.get('/logout',  verifyUser, logoutUser)

router.get('/profile', verifyUser, getProfile)

export default router
