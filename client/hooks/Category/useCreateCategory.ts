import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { toastContext } from "../../store/ToastContext"
import { isCategories } from "../../types/category"
import { categoryApi } from "./api"

export const useCreateCategory = () =>  {
    const {createCategory} = categoryApi()
    const {toastMessage} = useContext(toastContext)
    const queryClient = useQueryClient()

    return useMutation(createCategory, {
        onSuccess: (data) => {
            queryClient.setQueryData(['category'], old => {
                if(isCategories(old)){
                    return [data, ...old]
                }
            })
            toastMessage({message: "Successfully Created an Category", toastType: "success"})
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData('category', context)
            toastMessage({message: "Invalid ", toastType: "error"})
          },
          onSettled: () => {
            queryClient.invalidateQueries('category')
          }
    })
}