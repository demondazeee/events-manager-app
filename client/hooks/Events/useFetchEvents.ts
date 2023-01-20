import { useQuery, useQueryClient } from "react-query"
import { EventsDataBody } from "../../types/events"
import { eventApi } from "./api"

export const useFetchEvents = (category?: string, initialData?: EventsDataBody[], enabled?: boolean) => {
    const {fetchEvents} = eventApi()
    const queryClient = useQueryClient()


    return useQuery(["events"], () => fetchEvents("", category), {
        initialData,
        enabled,
        retry: 1,
        retryDelay: 500,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            queryClient.setQueryData("events", () => {
                return data
            })
        }
    })
}