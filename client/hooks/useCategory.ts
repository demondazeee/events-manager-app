import { useState } from "react";
import { useFetch } from "./useFetch"

export type CategoryDataBody = {
    id: string,
    name: string
}

export type useCategoryProp = {
    isLoading: boolean;
    categoryData: CategoryDataBody[];
    fetchEvents: () => Promise<void>;
}

export const useCategory = () => {

    const {fetchUrl} = useFetch();
    const [isLoading, setIsLoading] = useState(true)
    const [categoryData, setCategoryData] = useState<CategoryDataBody[]>([])

    const fetchEvents = async () => {
        

        const res = await fetchUrl({
            paths: "category",
            method: "GET"
        })
        
        if(!res){
            console.log('error')
        } else {
            if(res.ok){
                const data = await res.json();
                setIsLoading(false)
                setCategoryData(data)
            } else {
                console.log("error")
                setIsLoading(false)
            }
        }
    }

    return {
        isLoading,
        categoryData,
        fetchEvents
    }
}