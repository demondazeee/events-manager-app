import { useContext } from "react"
import { useQuery, useQueryClient } from "react-query"
import styled from "styled-components"
import { categoryApi } from "../../hooks/useCategory/api"
import { useEvent } from "../../hooks/useEvents"
import { eventApi } from "../../hooks/useEvents/api"
import { eventContext } from "../../store/EventContext"
import { CategoryDataBody } from "../../types/category"
import { isEvents } from "../../types/events"
import { LI } from "../elements/Lists"
import { P } from "../elements/Typography"
import { Card } from "../layouts/Card"

const CategoryItemContainer = styled(Card)`
    box-shadow: none;
    padding: 5px;
    transition: box-shadow .2s ease-out,
    transform .2s ease-out;

    &:hover {
        cursor: pointer;
        box-shadow: 4px 4px #000;
        transform: translate(-4px, -4px);
    }

    &:active {
        cursor: pointer;
        box-shadow: 3px 3px #000;
        transform: translate(-3px, -3px);
    }
`


const CategoryItem = ({id, name}: CategoryDataBody) => {
    const event = useContext(eventContext)
    if(event == null) {return <P>Loading..</P>}
    const {fetchEvents} = eventApi()
    const queryClient = useQueryClient()
    const eventsWithCategory = useQuery(["events", name], () => fetchEvents("", name), {
        retry: 1,
        retryDelay: 500,
        refetchOnWindowFocus: false,
        enabled: false,
        onSuccess: (data) => {
            event.setEventHandler(data!)
        }
    })
    if(eventsWithCategory == null) {return <P>Loading..</P>}
    if(eventsWithCategory.isLoading) {return <P>Loading...</P>}


    return ( 
        <LI onClick={() => {
            eventsWithCategory.refetch()
        }}>
            <CategoryItemContainer>
                <P>{name}</P>
            </CategoryItemContainer>
        </LI>
    )
}

export default CategoryItem