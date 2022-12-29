import { useState } from "react";
import { useFetch } from "./useFetch"

export type EventsDataBody = {
    id: string,
    headerImage: string,
    title: string,
    description: string,
    createdAt: string,
    ownerName: string
}

export const useEvents = () => {
    const {fetchUrl} = useFetch();
    const [eventsData, setEventsData] = useState<EventsDataBody[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchEvents = async () => {
        const res = await fetchUrl({
            paths: "events",
            method: "GET",
        })
        
        if(!res){
            console.log('error')
        } else {
            if(res.ok){
                const data = await res.json();
                setEventsData(data)
                setIsLoading(false)
            } else {
                console.log("error")
                setIsLoading(false)
            }
        }
    }

    return {}
}