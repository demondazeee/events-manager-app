import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import {EventsDataBody} from "../../../hooks/useEvents";
import {NextLink} from "../../elements/Buttons";
import {LI} from "../../elements/Lists";
import {H3} from "../../elements/Typography";
import {Card} from "../../layouts/Card";

type EventItemProps = {
    data: EventsDataBody
}

const EventCardContainer = styled(Card)`
    box-shadow: 0 0 0 0;
    border: 2px solid #000;
    border-radius: 5px;
    transition: box-shadow .2s ease-out, 
    transform .2s ease-out;

    &:hover {
        cursor: pointer;
        box-shadow: 6px 6px #000;
        transform: translate(-6px, -6px);
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

    return (
        <>
            <LI onClick={() =>{
                push(`/events/${id}`)
            }}>
                <EventCardContainer>
                    <EventContainer>
                        <H3>{title}</H3>
                        <ImageContainer>
                            <HeaderImage src="/sample.jpg"/>
                        </ImageContainer>
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
                    </EventContainer>
                </EventCardContainer>
            </LI>
        </>
    )
}

export default EventItem;
