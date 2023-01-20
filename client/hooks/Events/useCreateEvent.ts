import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { eventContext } from "../../store/EventContext"
import { toastContext } from "../../store/ToastContext"
import { isEvent, isEvents } from "../../types/events"
import { eventApi } from "./api"

export const useCreateEvent = () => {
    const {createEvent} = eventApi()
    const {toastMessage} = useContext(toastContext)
    const event = useContext(eventContext)
    const queryClient = useQueryClient()

    return useMutation(createEvent, {
        onSuccess: (data) => {
            queryClient.setQueryData(['events'], old => {
                if(isEvents(old)){
                    return [data, ...old]
                }
            })

            toastMessage({message: "Successfully Created an Event", toastType: "success"})
            event?.setCreateModeHandler(false)
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
            toastMessage({message: "Invalid ", toastType: "error"})
          },
          onSettled: () => {
            queryClient.invalidateQueries('events')
          }
    })
}