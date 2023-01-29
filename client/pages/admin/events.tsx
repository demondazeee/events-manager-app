import { GetServerSideProps } from "next"
import AdminDashboard from "../../components/Admin"
import Events from "../../components/Admin/Events"
import { useFetchEvents } from "../../hooks/Events/useFetchEvents"
import { EventsDataBody } from "../../types/events"

type CategoryPageProp = {
    data: EventsDataBody[]
}

const EventsPage = ({data}: CategoryPageProp) => {
    const events = useFetchEvents("", data)

    if(!data) {
        return <p>Loading...</p>
    }

    if(!events.data || events.isLoading) {
        return <p>Loading..</p>
    }
    

    return (
        <>
            <AdminDashboard>
                <Events data={events.data} />
            </AdminDashboard>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async () => {
    const url = process.env.NEXT_PUBLIC_SERVER
    const eventRes = await fetch(`${url}/events`)


    if(eventRes.ok) {
        const data = await eventRes.json();

        return {
            props: {
                data
            }
        }
    }


    return {
        props: {
            data: [],
        }
    }
}

export default EventsPage