import { useQuery, useQueryClient } from "react-query"
import { usersApi } from "./api"

export const useFetchUsers = (role: string) => {
    const {getUsers} = usersApi()
    const queryClient = useQueryClient()

    return useQuery(['users'], () => getUsers("", role), {
        retry: 1,
        retryDelay: 500,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            queryClient.setQueryData("users", () => {
                return data
            })
        }
    })
}