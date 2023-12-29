
import express from 'express'
import { createCast, getCast, getProfile } from '../helper/Cast.js'
import castUpload from '../helper/multer/Cast.js'
import { verifyAdmin } from '../middleware/Auth.js'

const router = express.Router()

router.get("/all", getCast)
router.post("/create-profile", verifyAdmin, castUpload.single('cast'), getProfile)
router.post('/create', verifyAdmin, createCast)

export default router