import { useMutation, useQuery, useQueryClient } from "react-query"
import { GetProfile } from "../apis/UserRequests"


export const GetProfileQuery = (onSuccess) => {
    return useQuery('user-profile', GetProfile, {
        onSuccess
    })
}

export const InValidCredentials = () => {
    const queryClient = useQueryClient()
    return useMutation(() => {
        queryClient.invalidateQueries('user-profile')
    })
}
