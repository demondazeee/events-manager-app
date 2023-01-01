import { createContext, ReactNode, useEffect } from "react"
import { useCategory, useCategoryProp } from "../hooks/useCategory"

type EventContext = {
    children: ReactNode
}

interface CategoryContextValue extends useCategoryProp  {

}


export const categoryContext = createContext<CategoryContextValue>({
    isLoading: true,
    categoryData: [],
    fetchEvents: async () => {}
})


const CategoryContext = ({children}: EventContext) => {
    const category = useCategory()
    useEffect(() =>{
        category.fetchEvents()
    }, [])

    const defaultValue = {
        ...category
    }

    return  (
        <categoryContext.Provider value={defaultValue}>
            {children}
        </categoryContext.Provider>
    )
}

export default CategoryContext