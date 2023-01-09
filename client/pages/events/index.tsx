import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import Category from "../../components/Category/Category";
import { H2, H3, H4, P } from "../../components/elements/Typography";
import EventList from "../../components/Events/EventList";
import { Card } from "../../components/layouts/Card";
import PageContainer from "../../components/layouts/PageContainer";
import { CategoryDataBody } from "../../hooks/useCategory";
import { EventsDataBody } from "../../hooks/useEvents";
import { eventContext } from "../../store/EventContext";


type EventsPageProp = {
    eventData: EventsDataBody[],
    categoryData: CategoryDataBody[]
}


const Events = ({eventData, categoryData}: EventsPageProp) => {
    const events = useContext(eventContext)

    if(!events) {
        return <P>Loading...</P>
    }

    useEffect(() => {
        events.setDefaultData(eventData)
    }, [])

    return (
        <>
            <PageContainer
            firstColumn={
                <>
                   <Category data={categoryData} />
                </>
            }
            mainColumn={
                <EventList eventData={events.eventsData} />
            } />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    const url = process.env.NEXT_PUBLIC_SERVER
    const eventRes = await fetch(`${url}/events`)
    const categoryRes = await fetch(`${url}/category`)


    if(eventRes.ok && categoryRes.ok) {
        const eventData = await eventRes.json();
        const categoryData = await categoryRes.json();

        return {
            props: {
                eventData,
                categoryData
            }
        }
    }


    return {
        props: {
            eventData: [],
            categoryData: [],
        }
    }
}


export default Events;