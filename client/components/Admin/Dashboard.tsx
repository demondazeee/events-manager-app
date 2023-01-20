import styled from "styled-components"
import { LI, UL } from "../elements/Lists"
import { H2, H3 } from "../elements/Typography"
import { Card } from "../layouts/Card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { FiLogOut } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegCalendarAlt, FaUsersCog, FaUsers } from "react-icons/fa";
import { useContext } from "react"
import { authContext } from "../../store/AuthContext"


const DashboardContainer = styled.div`
    height: 100vh;

    display: flex;
`

const DashboardSideBar = styled.div`
    flex-basis: 250px;
`

const SideBar_Container = styled.div`
    background-color: #000;
    color: #fff;
    padding: 1rem;
    height: 100%;

    & > *:not(:last-child) {
        margin-bottom: 25px;
    }
`

const SideBar_Menu = styled.nav`
    ul > *:not(:last-child) {
        margin-bottom: 12px;
    }
`

const SideBar_LinkButton = styled.a`
    font-size: 2.2rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    cursor: pointer;
`

const DashboardMain = styled.div`
    flex-basis: 1000px;
`

const DashboardMainContainer = styled.div`
    padding: 1rem;
    & > *:not(:last-child) {
        margin-bottom: 25px;
    }
`

const MainContainer = styled.div`
    display: grid;
    grid-template-columns:  repeat( 3, minmax(250px, 1fr) );

    gap: 1rem;
`

const ChartContainer = styled(Card)`
    grid-column: 1 / span 3;
`

const e = [
    {
      name: 'January  12',
        totalEvents: 23000
    },
    {
      name: 'January  13',
      totalEvents: 2300
    },
]

const Dashboard = () => {
    const auth  = useContext(authContext)


    return (
        <>
            <DashboardContainer>
                <DashboardSideBar>
                    <SideBar_Container>
                        <H2>Username</H2>
                        <SideBar_Menu>
                            <UL>
                                <LI>
                                    <SideBar_LinkButton><FaUsersCog />User Management</SideBar_LinkButton>
                                </LI>
                                <LI>
                                    <SideBar_LinkButton><FaRegCalendarAlt /> Events</SideBar_LinkButton>
                                </LI>
                                <LI>
                                    <SideBar_LinkButton><FaUsers />Event Managers</SideBar_LinkButton>
                                </LI>
                                <LI>
                                    <SideBar_LinkButton><BiCategoryAlt />Category</SideBar_LinkButton>
                                </LI>
                                <LI>
                                    <SideBar_LinkButton onClick={() => {auth?.logout.mutate()}}><FiLogOut /> Logout</SideBar_LinkButton>
                                </LI>
                            </UL>
                        </SideBar_Menu>
                    </SideBar_Container>
                </DashboardSideBar>

                <DashboardMain>
                    <DashboardMainContainer>
                        <H2>Dashboard</H2>
                        <MainContainer>
                            <Card>
                                <H3>Total Events</H3>
                            </Card>
                            <Card>
                                <H3>Total Members</H3>
                            </Card>
                            <Card>
                                <H3>Total Event Managers</H3>
                            </Card>
                           
                            <ChartContainer>
                                <ResponsiveContainer width="100%" height={500}>
                                    <BarChart width={500}
                                     data={e} 
                                     height={500}
                                     margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                      }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="totalEvents" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </MainContainer>
                    </DashboardMainContainer>
                </DashboardMain>
            </DashboardContainer>
        </>
    )
}

export default Dashboard