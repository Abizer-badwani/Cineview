
import express from 'express'
import { AdminLogin, AdminLogout, getAdminProfile } from '../controllers/Admin.js'
import {verifyAdmin} from '../middleware/Auth.js'
const router = express.Router()

router.post('/login', AdminLogin)
router.post('/logout',verifyAdmin, AdminLogout)
router.get('/profile', verifyAdmin, getAdminProfile)

export default router
