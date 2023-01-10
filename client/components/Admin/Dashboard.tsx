import styled from "styled-components"
import { LI, UL } from "../elements/Lists"
import { H2, H3 } from "../elements/Typography"
import { Card } from "../layouts/Card"

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

const Dashboard = () => {
    return (
        <>
            <DashboardContainer>
                <DashboardSideBar>
                    <SideBar_Container>
                        <H2>Username</H2>
                        <SideBar_Menu>
                            <UL>
                                <LI>
                                    <SideBar_LinkButton>User Management</SideBar_LinkButton>
                                </LI>
                                <LI>
                                    <SideBar_LinkButton>Events</SideBar_LinkButton>
                                </LI>
                                <LI>
                                    <SideBar_LinkButton>Event Managers</SideBar_LinkButton>
                                </LI>
                                <LI>
                                    <SideBar_LinkButton>Category</SideBar_LinkButton>
                                </LI>
                                <LI>
                                    <SideBar_LinkButton>Logout</SideBar_LinkButton>
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
                                <H3>Chart here</H3>
                            </ChartContainer>
                        </MainContainer>
                    </DashboardMainContainer>
                </DashboardMain>
            </DashboardContainer>
        </>
    )
}

export default Dashboard