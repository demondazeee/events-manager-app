import { useContext, useState } from "react";
import { authContext } from "../store/AuthContext";
import { useAuth } from "./useAuth";
import { useFetch } from "./useFetch"

export type EventsDataBody = {
    id: string,
    headerImage: string,
    title: string,
    description: string,
    createdAt: string,
    ownerName: string
}

export type EventsDataBodyInput = {
    title: string,
    description: string,
}

export interface useEventsBody {
    fetchEvents: (data: EventsDataBodyInput) => Promise<void>;
    createEvent: (data: EventsDataBodyInput) => Promise<void>;
}

export const useEvents = () => {
    const {fetchUrl} = useFetch();
    const user = useContext(authContext)
    const [eventsData, setEventsData] = useState<EventsDataBody[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchEvents = async (data: EventsDataBodyInput) => {
        const res = await fetchUrl({
            paths: "events",
            method: "POST",
            fetchOptions: {
                body: JSON.stringify(data)
            }
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

    const createEvent = async (data: EventsDataBodyInput) => {
        const res = await fetchUrl({
            paths: "events",
            method: "POST",
            headerOptions: {
                Authorization: `Bearer ${user?.userData.accessToken}`
            },
            fetchOptions: {
                body: JSON.stringify(data)
            }
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

    return {
        fetchEvents,
        createEvent
    }
}