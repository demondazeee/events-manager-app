import { useContext } from "react";
import { authContext } from "../../store/AuthContext";
import { EventsDataBodyInput, isEvent, isEvents } from "../../types/events";
import { useFetch } from "../useFetch";

export const eventApi = () => {
    const {fetchUrl} = useFetch();
    const auth = useContext(authContext)


    const fetchEvents = async (key?: string, category?: string) => {
        let paths = "events"
        if(category){
            paths = `events?category=${category}`
        }

        const res = await fetchUrl({
            paths,
            method: "GET"
        })
        
        if(!res.ok) {
            throw new Error()
        }
        const data = await res.json()
        if(isEvents(data)){
            
            return data
        }
    }

    const createEvent = async (eventData: EventsDataBodyInput) => {
        const res = await fetchUrl({
            paths: "events",
            method: "POST",
            headerOptions: {
                Authorization: `Bearer ${auth?.userData?.accessToken}`
            },
            fetchOptions: {
                body: JSON.stringify(eventData)
            }
        })
        
        if (!res.ok) {
            throw new Error()
        }
        const data:unknown = await res.json()
        if(isEvent(data)) {
            return data 
        }
    }

    return {
        fetchEvents,
        createEvent
    }
}