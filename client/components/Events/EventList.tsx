import { useContext } from "react"
import { useQuery, useQueryClient } from "react-query"
import styled from "styled-components"
import { useEvent } from "../../hooks/useEvents"
import { eventContext } from "../../store/EventContext"
import { EventsDataBody } from "../../types/events"
import { UL } from "../elements/Lists"
import { H3, P } from "../elements/Typography"
import { Card } from "../layouts/Card"
import { ContainerLayout } from "../layouts/Container"
import EventItem from "./EventItem"

type EventListProp = {
    eventData: EventsDataBody[]
}


const EventListContainer = styled(UL)`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`


const EventList = ({eventData}: EventListProp) => {

    return (
        <>
            <EventListContainer>
                {
                    eventData.length == 0 ? "Loading..." :
                    eventData.map(e => {
                        return (
                            <EventItem key={e.id} data={e} />
                        )
                    })
                    

                }

            </EventListContainer>
        </>
    )
}

export default EventList