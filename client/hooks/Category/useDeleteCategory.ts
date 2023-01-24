import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { toastContext } from "../../store/ToastContext"
import { isCategories } from "../../types/category"
import { categoryApi } from "./api"

export const useDeleteCategory = () => {
    const {deleteCategory} = categoryApi()
    const {toastMessage} = useContext(toastContext)
    const queryClient = useQueryClient()

    return useMutation(deleteCategory, {
        onSuccess: (data, variable) => {
            queryClient.setQueryData(['category'], old => {
                if(isCategories(old)){
                    const updated = old.filter(
                        v => {
                            v.id !== variable
                        }
                    )
                    return updated
                }
            })
            toastMessage({message: "Successfully Deleted a Category", toastType: "success"})
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