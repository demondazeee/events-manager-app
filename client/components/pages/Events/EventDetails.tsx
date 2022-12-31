import Link from "next/link"
import styled from "styled-components"
import {EventsDataBody} from "../../../hooks/useEvents"
import {H2, H3} from "../../elements/Typography"
import { Card } from "../../layouts/Card"

type EventItemProps = {
    data: EventsDataBody
}


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

const EventItemFooter = styled.footer `
    display: flex;
    justify-content: space-between;
`


const EventDetails = ({data} : EventItemProps) => {
    const {id, title, description, createdAt, ownerName} = data;
    const date = new Date(createdAt)
    return (
        <>
            <Card>
                <EventContainer>
                    <ImageContainer>
                        <HeaderImage src="/sample.jpg"/>
                    </ImageContainer>
                    <H2>{title}</H2>
                    
                    <EventItemFooter>
                        <p>{
                            date.toDateString()
                        }</p>
                        <p>Posted By:
                            <Link href={
                                `/profile/${ownerName}`
                            }>
                                {ownerName}</Link>
                        </p>
                    </EventItemFooter>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, deserunt non at repellat in laudantium quam deleniti, debitis autem omnis rem perferendis eius, soluta asperiores rerum. Molestias laudantium mollitia vero.
                    </p>
                </EventContainer>
            </Card>
        </>
    )
}

export default EventDetails;
