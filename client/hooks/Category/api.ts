import { useContext, useState } from "react";
import { authContext } from "../../store/AuthContext";
import { isCategories } from "../../types/category";
import { useFetch } from "../useFetch";


export const categoryApi = () => {
    const {fetchUrl} = useFetch();
    const auth = useContext(authContext)

    // const URL = process.env.NEXT_PUBLIC_SERVER
    const fetchCategory = async () => {
        const res = await fetchUrl({
            paths: "category",
            method: "GET"
        })

        if(!res.ok) {
            throw new Error()
        }

        const data = await res.json()
        if(isCategories(data)){
            return data
        }
    }

    const createCategory = async (name: string) => {
        const res = await fetchUrl({
            paths: 'category',
            method: 'POST',
            headerOptions: {
                'Authorization': `Bearer ${auth?.userData?.accessToken}`
            },
            fetchOptions: {
                body: JSON.stringify({
                    name
                })
            }
        })

        if(!res.ok) {
            throw new Error()
        }

        const data = await res.json()
        if(isCategories(data)){
            return data
        }
    }

    const deleteCategory = async (id: string) => {
        const res = await fetchUrl({
            paths: `category/${id}`,
            method: 'DELETE',
            headerOptions: {
                'Authorization': `Bearer ${auth?.userData?.accessToken}`
            },
        })

        if(!res.ok) {
            throw new Error()
        }
    }

    return {
        fetchCategory,
        createCategory,
        deleteCategory
    }
}

