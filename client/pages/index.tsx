import { GetServerSideProps, GetStaticProps } from "next"
import styled from "styled-components"
import { H3 } from "../components/elements/Typography"
import { Card } from "../components/layouts/Card"
import PageContainer from "../components/layouts/PageContainer"
import EventList from "../components/pages/Events/EventList"
import { EventsDataBody } from "../hooks/useEvents"

type DataProp = {
  data: EventsDataBody[]
}

const IndexHeader = styled(Card)`
  box-shadow: none;
  margin-bottom: 20px;
  padding: 1em;
`

const Home = ({data}: DataProp) => {
  return (
    <>

       <PageContainer mainColumn={
        <>
          <IndexHeader>
            <H3>Latest Events 🌟</H3>
          </IndexHeader>
          <EventList eventData={data} />
        </>
       } />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.NEXT_PUBLIC_SERVER
 try{
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
 } catch(e: any) {
  return {
    props: {
      data: []
    }
  }
 }
}

export default Home