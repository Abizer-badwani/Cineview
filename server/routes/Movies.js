import express from 'express'
import { createMovie, deleteMovie, getAllMovies, getMovie, getThumbnail, getTrailer, updateMovie } from '../controllers/Movies.js'
import thumbnailUpload from '../helper/multer/Thumbnail.js'
import trailerUpload from '../helper/multer/Trailer.js'
import {verifyAdmin } from '../middleware/Auth.js'

const router = express.Router()

router.get('/all', getAllMovies)
router.get('/:movie', getMovie)

router.post('/create-thumbnail',verifyAdmin, thumbnailUpload.single('thumbnail'), getThumbnail)
router.post('/create-trailer',verifyAdmin, trailerUpload.single('trailer'), getTrailer)
router.post('/create-movie', verifyAdmin, createMovie)

router.delete('/delete', verifyAdmin, deleteMovie)

export default router
