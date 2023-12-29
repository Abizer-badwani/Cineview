
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import './config/databse.js'

import user_router from './routes/Auth.js'
import admin_router from './routes/Admin.js'

import movie_router from './routes/Movies.js'
import cast_router from './routes/Cast.js'
import review_router from './routes/Reviews.js'
import ticket_router from './routes/Ticket.js'
import wishlist_router from './routes/Wishlist.js'
import payment_route from './routes/Payments.js'
import purchase_router from './routes/Purchase.js'

const app = express()

app.use(express.json())
app.use(express.static('uploads'))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


app.use('/auth', user_router)
app.use('/movie', movie_router)
app.use('/cast', cast_router)
app.use('/reviews', review_router)
app.use('/admin', admin_router)
app.use('/ticket', ticket_router)
app.use('/wishlist', wishlist_router)
app.use('/payment', payment_route)
app.use('/purchase', purchase_router)

app.listen(6767)

