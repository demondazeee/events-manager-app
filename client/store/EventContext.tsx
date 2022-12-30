import { createContext, ReactNode } from "react"
import { useEvents, useEventsBody } from "../hooks/useEvents";

type EventContext = {
    children: ReactNode
}

interface EventContextValue extends useEventsBody  {
    
}


export const eventContext = createContext<EventContextValue | null>(null)


const EventContext = ({children}: EventContext) => {
    const event = useEvents();

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