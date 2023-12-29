import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"

const getProfile = async () => {
    const { data } = await axios.get('http://localhost:6767/admin/profile')
    return data
}

export const GetAdminProfileQuery = async (onSuccess) => {
    return useQuery('admin-auth', getProfile, {onSuccess})
}

export const InvalideAdminCred = () => {
    const queryClient = useQueryClient()
        return useMutation(() => {
            queryClient.invalidateQueries('admin-auth')
        })
  }