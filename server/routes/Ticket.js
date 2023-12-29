
import express from 'express'
import { createTicket } from '../controllers/Ticket.js'
import {verifyUser} from '../middleware/Auth.js'

const router = express.Router()

router.post('/new', verifyUser, createTicket)

export default router
