import { createContext, Dispatch, ReactNode, SetStateAction, useState} from "react"
import { useEvent } from "../hooks/useEvents"
import { EventsDataBody, useEventsBody } from "../types/events"

type EventContext = {
    children: ReactNode
}

interface EventContextValue extends useEventsBody  {

}


export const eventContext = createContext<EventContextValue | null>(null)


const EventContext = ({children}: EventContext) => {
    const event = useEvent();
    const [eventData, setEventData] = useState<EventsDataBody[]>([])

    const setEventHandler = (data: EventsDataBody[]) => {
        setEventData(data)
    }

    const defaultValue = {
        ...event,
        setEventHandler,
        eventData
    }

    return (
        <eventContext.Provider value={defaultValue}>
            {children}
        </eventContext.Provider>
    )
}

export default EventContext