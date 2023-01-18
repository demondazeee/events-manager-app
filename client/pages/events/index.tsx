import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Category from "../../components/Category/Category";
import { H2, H3, H4, P } from "../../components/elements/Typography";
import EventList from "../../components/Events/EventList";
import { Card } from "../../components/layouts/Card";
import Layout from "../../components/layouts/Container";
import PageContainer from "../../components/layouts/PageContainer";
import { eventApi } from "../../hooks/useEvents/api";
import { eventContext } from "../../store/EventContext";
import { CategoryDataBody } from "../../types/category";
import { EventsDataBody, isEvents } from "../../types/events";



type EventsPageProp = {
    eventData: EventsDataBody[],
    categoryData: CategoryDataBody[]
}


const Events = ({eventData, categoryData}: EventsPageProp) => {
    const event = useContext(eventContext)
    const {fetchEvents} = eventApi()
    const queryClient = useQueryClient()

    if(event == null) {return <P>Loading...</P>}

    const eventsWithCategory = useQuery(["events"], () => fetchEvents(""), {
        retry: 1,
        retryDelay: 500,
        refetchOnWindowFocus: false,
        enabled: false,
        onSuccess: (data) => {
            if(isEvents(data)){
                event.setEventHandler(data)
            }
        }
    })
    return (
        <>
           <Layout title="All Events">
           <PageContainer
            firstColumn={
                <>
                   <Category data={categoryData} />
                </>
            }
            mainColumn={
               <EventList eventData={event.eventData} />
            } />
           </Layout>
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

