import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { EventsDataBody } from "../../types/events";
import { LI } from "../elements/Lists";
import { H3, P } from "../elements/Typography";
import { Card } from "../layouts/Card";

type EventItemProps = {
    data: EventsDataBody
}

const EvenTitle = styled(H3)`
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`

const EventContainer = styled.div `
    padding: 2rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const ImageContainer = styled.div `

`

const HeaderImage = styled.img `
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
`

const EventItemFooter = styled.footer `
    display: flex;
    justify-content: space-between;
`

const EventItem = ({data} : EventItemProps) => {
    const {id, title, createdAt, ownerName} = data;
    const date = new Date(createdAt)
    const {push} = useRouter()
    // push(`/events/${id}`)
    return (
        <>
            <LI>
                <Card>
                    <EventContainer>
                        <EvenTitle onClick={() => {push(`/events/${id}`)}}>{title}</EvenTitle>
                        <ImageContainer>
                            <HeaderImage src="/sample.jpg"/>
                        </ImageContainer>
                        <EventItemFooter>
                            <P>{
                                date.toDateString()
                            }</P>
                            <P>Posted By:
                                <Link href={
                                    `/profile/${ownerName}`
                                }>
                                    {ownerName}</Link>
                            </P>
                        </EventItemFooter>
                    </EventContainer>
                </Card>
            </LI>
        </>
    )
}

export default EventItem;
