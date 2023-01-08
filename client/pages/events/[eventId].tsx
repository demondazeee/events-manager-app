import { GetServerSideProps } from "next"
import { H3 } from "../../components/elements/Typography"
import EventDetails from "../../components/Events/EventDetails"
import { EventsDataBody } from "../../hooks/useEvents"

type EventDetailsPageProp = {
    data: EventsDataBody
}


const EventDetailsPage = ({data}: EventDetailsPageProp) => {
    
    if(!data){
        return <H3>Loading....</H3>
    }
    
    return (
        <>
            <EventDetails data={data} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {params} = context

    if(!params){
        return {notFound: true}
    }

    const url = process.env.NEXT_PUBLIC_SERVER
    const res = await fetch(`${url}/events/${params.eventId}`)

    if(!res.ok) {
        return {notFound: true}
    }


    const data = await res.json();

        return {
        props: {
            data
        }
    }
}

export default EventDetailsPage