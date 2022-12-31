import { GetServerSideProps } from "next";
import PageContainer from "../../components/layouts/PageContainer";
import EventList from "../../components/pages/Events/EventList";
import { EventsDataBody } from "../../hooks/useEvents";

type EventsPageProp = {
    data: EventsDataBody[]
}


const Events = ({data}: EventsPageProp) => {
    return (
        <>
            <PageContainer mainColumn={
                <EventList eventData={data} />
            } />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    const url = process.env.NEXT_PUBLIC_SERVER
    const res = await fetch(`${url}/events`)

    if(res.ok) {
        const data = await res.json();

        return {
        props: {
            data
        }
        }
    }


    return {
        props: {
        data: []
        }
    }
}


export default Events;