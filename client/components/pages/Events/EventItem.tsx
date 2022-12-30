import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { EventsDataBody } from "../../../hooks/useEvents";
import { LI } from "../../elements/Lists";
import { H3 } from "../../elements/Typography";
import { Card } from "../../layouts/Card";

type EventItemProps = {
    data: EventsDataBody
}



const EventContainer = styled.div`
    padding: 2rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const ImageContainer = styled.div`

`

const HeaderImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
`

const EventItemFooter = styled.footer`
    display: flex;
    justify-content: space-between;
`

const EventItem = ({data}: EventItemProps) => {
    const {id, title, createdAt, ownerName} = data;
    const date = new Date(createdAt)
    return (
        <>
            <LI>
                <Card>
                    <EventContainer>
                        <H3>{title}</H3>
                        <ImageContainer>
                            <HeaderImage src="/sample.jpg" />
                        </ImageContainer>
                        <EventItemFooter>
                            <p>{date.toDateString()}</p>
                            <p>Posted By: <Link href={`/profile/${ownerName}`}>{ownerName}</Link></p>
                        </EventItemFooter>
                    </EventContainer>
                </Card>
            </LI>
        </>
    )
}

export default EventItem;