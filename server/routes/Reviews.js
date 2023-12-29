
import express from 'express'
import { createReview, deleteReview } from '../helper/Reviews.js'
import {verifyUser} from '../middleware/Auth.js'

const router = express.Router()

// router.get('/all', getAllReviews)
router.post('/create', verifyUser, createReview)
router.delete('/delete', verifyUser, deleteReview)

export default router
