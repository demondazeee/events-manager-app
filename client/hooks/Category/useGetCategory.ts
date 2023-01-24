import { useQuery, useQueryClient } from "react-query"
import { CategoryDataBody } from "../../types/category"
import { categoryApi } from "./api"

export const useGetCategory = (initialData?: CategoryDataBody[]) => {
    const {fetchCategory} = categoryApi()
    const queryClient = useQueryClient()


    return useQuery(["category"], fetchCategory, {
        initialData,
        retry: 1,
        retryDelay: 500,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            queryClient.setQueryData("category", () => {
                return data
            })
        }
    })
}