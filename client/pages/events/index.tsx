import { GetServerSideProps } from "next";
import { H2, H3, H4 } from "../../components/elements/Typography";
import { Card } from "../../components/layouts/Card";
import PageContainer from "../../components/layouts/PageContainer";
import Category from "../../components/pages/Category/Category";
import EventList from "../../components/pages/Events/EventList";
import { CategoryDataBody } from "../../hooks/useCategory";
import { EventsDataBody } from "../../hooks/useEvents";

type EventsPageProp = {
    eventData: EventsDataBody[],
    categoryData: CategoryDataBody[]
}


const Events = ({eventData, categoryData}: EventsPageProp) => {
    return (
        <>
            <PageContainer
            firstColumn={
                <>
                   <Category data={categoryData} />
                </>
            }
            mainColumn={
                <EventList eventData={eventData} />
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