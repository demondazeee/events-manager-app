import styled from "styled-components"
import { EventsDataBody } from "../../../hooks/useEvents"
import { UL } from "../../elements/Lists"
import { H2, H3 } from "../../elements/Typography"
import { Card } from "../../layouts/Card"
import {ContainerLayout} from '../../layouts/Container'
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
                {eventData.length <= 0 ? 
                <H3>No Data : (</H3>
                :
                eventData.map(e => {
                    return (
                        <EventItem key={e.id} data={e} />
                    )
                })}
            </EventListContainer>
        </>
    )
}

export default EventList