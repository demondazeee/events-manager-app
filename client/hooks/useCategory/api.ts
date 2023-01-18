import { useState } from "react";
import { isCategories } from "../../types/category";
import { useFetch } from "../useFetch";


export const categoryApi = () => {
    const {fetchUrl} = useFetch();

    // const URL = process.env.NEXT_PUBLIC_SERVER
    const fetchEvents = async () => {
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

    return {
        fetchEvents
    }
}

