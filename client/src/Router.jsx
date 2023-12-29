import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Specific from './pages/Specific'
import NotFound from './components/NotFound'
import Dashboard from './admin/Dashboard'
import AdminAuth from './admin/AdminAuth'
import TicketPage from './pages/TicketPage'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { UserState } from './context/UserContext'
import MovieList from './admin/MovieList'
import Wishlist from './pages/Wishlist'
import Success from './pages/Success'
import Purchased from './pages/Purchased'
import Admin_Navbar from './admin/Admin_Navbar'
import Navbar from './components/Navbar'

const Router = () => {

    const { userState } = UserState()

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navbar />}>
                    <Route index element={<Home />} />
                    {
                        userState ?
                            <Route path='ticket'>
                                <Route index element={<TicketPage />} />
                            </Route>
                            :
                            null
                    }
                    <Route path='movie'>
                        <Route index element={<Movies />} />
                        <Route path=':id' >
                            <Route index element={<Specific />} />
                        </Route>
                    </Route>
                    <Route path='admin' >
                        <Route path='login' element={<AdminAuth />} />
                        <Route path='dashboard' element={<Admin_Navbar />}>
                            <Route index element={<Dashboard />} />
                            <Route path='movies' element={<MovieList />} />
                        </Route>

                    </Route>
                </Route>
                <Route path='/success' element={<Success />} />
                {
                    userState ?
                        <Route path='user'>
                            <Route path='profile' element={<Profile />} />
                            <Route path='wishlist' element={<Wishlist />} />
                            <Route path='purchased' element={<Purchased />} />
                        </Route>
                        :
                        <Route path='auth'>
                            <Route path='signup' element={<Signup />} />
                            <Route path='login' element={<Login />} />
                        </Route>
                }
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
