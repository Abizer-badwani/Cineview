
import express from 'express'
import { purchaseMovie } from '../helper/Purchase.js'
import {verifyUser} from '../middleware/Auth.js'

const router = express.Router()

router.post('/add', verifyUser, purchaseMovie)

export default router
