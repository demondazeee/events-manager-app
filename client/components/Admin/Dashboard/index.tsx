import styled from "styled-components"
import { H2, H3 } from "../../elements/Typography"
import { Card } from "../../layouts/Card"
import Charts from "../Charts"

const DashboardMainContainer = styled.div`
    & > *:not(:last-child) {
        margin-bottom: 25px;
    }
`

const MainContainer = styled.div`
    display: grid;
    grid-template-columns:  repeat( 12, minmax(0, 1fr) );
    justify-content: center;
    gap: 1rem;
`
const TotalContainer = styled(Card)`
    grid-column: span 3;
`

const ChartContainer = styled(Card)`
    grid-column: 1 / span 9;
    padding: 2rem;

`

const PieChartContainer = styled(Card)`
    grid-column: span 3;
    padding: 2rem;
`


export const options = {
    responsive: true,
    maintainAspectRatio : false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  

  const labels = ['January', 'February'];
    
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1000, 100 , 5000],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [1000, 100 , 2],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };



const Dashboard = () => {
    return (
        <>
            <DashboardMainContainer>
                <H2>Dashboard</H2>
                <MainContainer>
                    <TotalContainer>
                        <H3>Total Events</H3>
                    </TotalContainer>
                    <TotalContainer>
                        <H3>Total Members</H3>
                    </TotalContainer>
                    <TotalContainer>
                        <H3>Total Event Managers</H3>
                    </TotalContainer>
                    <TotalContainer>
                        <H3>Total Unverified Managers</H3>
                    </TotalContainer>
                    <ChartContainer>
                        <Charts data={data}
                            title="Total Events"
                            type="line"
                            height="450px"/>
                    </ChartContainer>
                    <PieChartContainer>
                        <Charts data={data}
                            title="Category"
                            type="pie"/>
                    </PieChartContainer>
                </MainContainer>
            </DashboardMainContainer>
        </>
    )
}

export default Dashboard