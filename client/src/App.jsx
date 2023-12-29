import React from 'react'
import Router from './Router'
import { FilterProvider, UserProvider } from './context/UserContext'
import { MovieProvider } from './context/MovieContext'
import {AdminProvider} from './context/AdminContext'


const App = () => {
  return (
    <AdminProvider>
    <UserProvider>
      <MovieProvider>
          <FilterProvider>
          <Router />
      </FilterProvider>
      </MovieProvider>
    </UserProvider>
    </AdminProvider>
  )
}

export default App