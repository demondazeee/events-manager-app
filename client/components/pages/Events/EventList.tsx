import styled from "styled-components"
import { EventsDataBody } from "../../../hooks/useEvents"
import { UL } from "../../elements/Lists"
import {PageContainer} from '../../layouts/Container'
import EventItem from "./EventItem"

type EventListProp = {
    eventData: EventsDataBody[]
}

const ItemContainer = styled(PageContainer)`
    max-width: 600px;
    padding: 50px 0;
`

const EventListContainer = styled(UL)`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`


const EventList = ({eventData}: EventListProp) => {
    return (
        <>
            <ItemContainer>
                <EventListContainer>
                    {eventData.map(e => {
                        return (
                            <EventItem key={e.id} data={e} />
                        )
                    })}
                </EventListContainer>
            </ItemContainer>
        </>
    )
}

export default EventList