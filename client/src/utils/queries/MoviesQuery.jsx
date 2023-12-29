import { useMutation, useQuery, useQueryClient } from "react-query"
import { GetAllMovies } from "../apis/MoviesRequests"


export const GetAllMoviesQuery = (onSuccess) => {
    return useQuery(['movies'], GetAllMovies, {onSuccess})
}

export const InvalidateMovie = (id) => {
    const queryClient = useQueryClient()
    return useMutation(() => {
        queryClient.invalidateQueries(['movie', id])
    })
}