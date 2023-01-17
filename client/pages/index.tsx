import { GetServerSideProps, GetStaticProps } from "next"
import styled from "styled-components"
import Dashboard from "../components/Admin/Dashboard"
import { H3 } from "../components/elements/Typography"
import EventList from "../components/Events/EventList"
import { Card } from "../components/layouts/Card"
import Layout from "../components/layouts/Container"
import PageContainer from "../components/layouts/PageContainer"
import { EventsDataBody } from "../types/events"

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
      <Layout title="Latest Events">
      <PageContainer mainColumn={
        <>
          <IndexHeader>
            <H3>Latest Events 🌟</H3>
          </IndexHeader>
          <EventList eventData={data} />
        </>
       } />
      </Layout>
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