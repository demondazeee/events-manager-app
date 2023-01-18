import { useContext, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toastContext } from "../../store/ToastContext"
import { EventsDataBody, isEvent, isEvents } from "../../types/events"
import { eventApi } from "./api"

export const useEvent = (category?: string,  initialData?: EventsDataBody[]) => {
    const queryClient = useQueryClient()
    const {fetchEvents, createEvent} = eventApi()
    const [isCreateMode, setIsCreateMode] = useState(false)
    const {toastMessage} = useContext(toastContext)
    
    const setCreateModeHandler = (isCreate: boolean) => {
        setIsCreateMode(isCreate)
    }

    const events = useQuery(["events"], () => fetchEvents(), {
        retry: 1,
        retryDelay: 500,
        refetchOnWindowFocus: false
    })



    const create = useMutation(createEvent, {
        onSuccess: (data) => {
            queryClient.setQueryData(['events'], old => {
                if(isEvents(old) && isEvent(data)){
                    
                    return [data, ...old]
                }
            })

            toastMessage({message: "Successfully Created an Event", toastType: "success"})
            setCreateModeHandler(false)
        },
        onMutate: async newTodo => {
            await queryClient.cancelQueries('events')
        
            const previousEvents = queryClient.getQueryData('events')
        
            if(isEvents(previousEvents)) {
              return { previousEvents }
            }
          },
          onError: (err, newTodo, context) => {
            queryClient.setQueryData('events', context?.previousEvents)
          },
          onSettled: () => {
            queryClient.invalidateQueries('events')
          }
    })

    return {
        isCreateMode,
        setCreateModeHandler,
        events,
        create
    }
}