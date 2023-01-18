import Link from "next/link"
import styled from "styled-components"
import parse from 'html-react-parser'
import { Card } from "../layouts/Card"
import { H2, H3, P } from "../elements/Typography"
import { EventsDataBody } from "../../types/events"



type EventItemProps = {
    data: EventsDataBody
}

const EventDetailContainer = styled.div`
    padding: 50px 0;
`

const EventContainer = styled.div `
    padding: 2rem;

    display: flex;
    flex-direction: column;
    gap: 3rem;
`



const ImageContainer = styled.div `
    height: 450px;
`

const HeaderImage = styled.img `
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: bottom;
    overflow: hidden;
`


const EventDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-size: initial;
`

const EventItemFooter = styled.footer `
    display: flex;
    justify-content: space-between;
`


const EventDetails = ({data} : EventItemProps) => {
    const {id, title, description, createdAt, fromDate, toDate, ownerName} = data;
    const date = new Date(createdAt)
    const from = new Date(fromDate)
    const to = new Date(toDate)

    return (
        <>
        <EventDetailContainer>
                <Card>
                    <EventContainer>
                        <ImageContainer>
                            <HeaderImage src="/sample.jpg"/>
                        </ImageContainer>
                        <H2>{title}</H2>
                        
                        <EventItemFooter>
                            <P>{
                               `From: ${from.toDateString()} - To: ${to.toDateString()}`
                            }</P>
                            <P>Posted By:
                                <Link href={
                                    `/profile/${ownerName}`
                                }>
                                    {ownerName}</Link>
                            </P>
                        </EventItemFooter>
                        <EventDescriptionContainer>
                            <H3>About the Event:</H3>
                            {parse(description)}
                        </EventDescriptionContainer>
                    </EventContainer>
                </Card>
            </EventDetailContainer>
        </>
    )
}

export default EventDetails;
