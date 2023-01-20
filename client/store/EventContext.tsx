import { createContext, Dispatch, ReactNode, SetStateAction, useState} from "react"
import { EventsDataBody, useEventsBody } from "../types/events"

type EventContext = {
    children: ReactNode
}

interface EventContextValue extends useEventsBody  {

}


export const eventContext = createContext<EventContextValue | null>(null)


const EventContext = ({children}: EventContext) => {
    const [isCreateMode, setIsCreateMode] = useState(false)


    const setCreateModeHandler = (isCreate: boolean) => {
        setIsCreateMode(isCreate)
    }

    const defaultValue = {
        isCreateMode,
        setCreateModeHandler
    }

    return (
        <eventContext.Provider value={defaultValue}>
            {children}
        </eventContext.Provider>
    )
}

export default EventContext