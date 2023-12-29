import { createContext, useContext, useReducer } from "react";
import { movieReducer } from "./Reducer";
import { GetAllMoviesQuery } from "../utils/queries/MoviesQuery";

const MovieContext = createContext()

const MovieProvider = ({children}) => {

    const [movieState, movieDispatch] = useReducer(movieReducer, [])

    const onSuccess = (data) => {
		if (data?.success) {
			movieDispatch({type: 'GET_ALL', payload: data.movies})
		}
	}

	GetAllMoviesQuery(onSuccess)
       
    return <MovieContext.Provider value={{movieState, movieDispatch}}>
        {children}
    </MovieContext.Provider>
}

const UseMovie = () => useContext(MovieContext)

export {MovieProvider, UseMovie}