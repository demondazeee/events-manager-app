import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import Category from "../../components/Category/Category";
import { H2, H3, H4, P } from "../../components/elements/Typography";
import EventList from "../../components/Events/EventList";
import { Card } from "../../components/layouts/Card";
import Layout from "../../components/layouts/Container";
import PageContainer from "../../components/layouts/PageContainer";
import Search from "../../components/Search";
import { useFetchEvents } from "../../hooks/Events/useFetchEvents";
import { eventContext } from "../../store/EventContext";
import { CategoryDataBody } from "../../types/category";
import { EventsDataBody, isEvents } from "../../types/events";


type EventsPageProp = {
    eventData: EventsDataBody[],
    categoryData: CategoryDataBody[]
}

const EventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const Events = ({eventData, categoryData}: EventsPageProp) => {
    const {data, isLoading} = useFetchEvents("", eventData)

    if(!eventData) {return <P>Loading...</P>}

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
                isLoading || !data ? <P>Loading..</P>:
               <>
                    <EventsContainer>
                        <Search />
                        <EventList eventData={data} />
                    </EventsContainer>
               </>
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

