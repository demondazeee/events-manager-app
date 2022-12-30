import { GetServerSideProps } from "next"
import { PageContainer } from "../components/layouts/PageContainer"
import EventList from "../components/pages/Events/EventList"
import { EventsDataBody } from "../hooks/useEvents"

const dummyData: EventsDataBody[] = [
  {
    id: "c0dc4d68-a6a4-4ed6-beea-4ac29d1249f6",
    headerImage: "",
    title: "zxczxc",
    description: "zxczxc",
    createdAt: "2022-12-28T22:17:33.815244Z",
    ownerName: "manager"
  },
  {
    id: "c0dc4d68-a6a4-4ed6-beea-4ac29d1249f6",
    headerImage: "",
    title: "zxczxc",
    description: "zxczxc",
    createdAt: "2022-12-28T22:17:33.815244Z",
    ownerName: "manager"
  }
]

type DataProp = {
  data: EventsDataBody[]
}

const Home = ({data}: DataProp) => {
  
  return (
    <>
      <PageContainer>
        <EventList eventData={data} />
      </PageContainer>
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

export default Home