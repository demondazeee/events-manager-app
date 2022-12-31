import { createContext, ReactNode, useEffect, useState } from "react"
import { useEvents, useEventsBody } from "../hooks/useEvents";

type EventContext = {
    children: ReactNode
}

interface EventContextValue extends useEventsBody  {

}


export const eventContext = createContext<EventContextValue | null>(null)


const EventContext = ({children}: EventContext) => {
    
    const event = useEvents();

    // useEffect(() => {
    //     console.log('hehe')
    //     event.fetchEvents();
    // }, [])

    const defaultValue = {
        ...event
    }

    return (
        <eventContext.Provider value={defaultValue}>
            {children}
        </eventContext.Provider>
    )
}

export default EventContext