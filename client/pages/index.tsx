import { GetServerSideProps, GetStaticProps } from "next"
import PageContainer from "../components/layouts/PageContainer"
import EventList from "../components/pages/Events/EventList"
import { EventsDataBody } from "../hooks/useEvents"

type DataProp = {
  data: EventsDataBody[]
}

const Home = ({data}: DataProp) => {
  return (
    <>
       <PageContainer mainColumn={<EventList eventData={data} />} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.NEXT_PUBLIC_SERVER
  const res = await fetch(`${url}/events?pageSize=5`)

  if(res.ok) {
    const data = await res.json();

    return {
      props: {
        data
      },
      revalidate: 2
    }
  }


  return {
    props: {
      data: []
    }
  }
}

export default Home