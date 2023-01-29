"use client"

import styled from "styled-components"

import { FiLogOut } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegCalendarAlt, 
    FaUserShield, 
    FaUsers,
    FaUserClock,
    FaChartBar,
    FaUserAlt,
    FaAngleDown,
    FaAngleUp } from "react-icons/fa";
import { ReactNode, useContext, useState } from "react"
import { Card } from "../layouts/Card";
import { H2, H3, P } from "../elements/Typography";
import { LI, UL } from "../elements/Lists";
import Charts from "./Charts";
import { authContext } from "../../store/AuthContext";
import Dashboard from "./Dashboard";
import { useRouter } from "next/router";
import { useFetchUsers } from "../../hooks/Users/useFetchUsers";


const DashboardContainer = styled.div`
    position: relative;
    height: 100vh;

    display: flex;
`

const DashboardSideBar = styled.div`
    flex-basis: 265px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
`

const SideBar_Container = styled.div`
    background-color: #101010;
    padding: 1rem;
    height: 100%;

    & > *:not(:last-child) {
        margin-bottom: 25px;
    }
`

const SideBarContainer_Username = styled(H2)`
    color: #fff;
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
    color: #fff;

    cursor: pointer;
`

const SideBar_LinkButton_Users = styled(SideBar_LinkButton)`
    & > div { 
        position: relative;
    }
`

const SideBar_SubMenu = styled.div`
    
    position: relative;
    padding: 1rem 0;
    left: 15%;
    overflow: hidden;
`

const DashboardMain = styled.div`
    height: 100%;
    flex-basis: 100%;
    margin-left: 265px;
    padding: 1rem;
`

type AdminDashboardProps = {
    children: ReactNode
}

const AdminDashboard = ({children}: AdminDashboardProps) => {
    const auth  = useContext(authContext)
    const router = useRouter()
    const [showSideBar, setShowSideBar] = useState(false)


    if(auth == null) {return <P>Loading...</P>}

    if(auth.refresh.isLoading) {return <P>Loading....</P>}

    if(!auth.isLoggedIn) {
        router.push('/admin/login')
    }

    return (
        <>
            <DashboardContainer>
                <DashboardSideBar>
                    <SideBar_Container>
                        <SideBarContainer_Username>Username</SideBarContainer_Username>
                        <SideBar_Menu>
                            <UL>
                                <LI>
                                    <SideBar_LinkButton onClick={() => {router.push('/admin/dashboard')}}><FaChartBar />Dashboard</SideBar_LinkButton>
                                </LI>
                                <LI>
                                    <SideBar_LinkButton_Users onClick={() => {setShowSideBar(prev => !prev)}}>
                                        <FaUsers />
                                        <div>User Management</div>
                                        {!showSideBar ? <FaAngleUp /> : <FaAngleDown />}
                                    </SideBar_LinkButton_Users>
                                    {
                                        !showSideBar &&
                                        <SideBar_SubMenu>
                                            <UL>
                                                <LI>
                                                    <SideBar_LinkButton onClick={() => {

                                                        router.push('/admin/users/admin')
                                                        }}><FaUserShield />Admin</SideBar_LinkButton>
                                                </LI>
                                                <LI>
                                                    <SideBar_LinkButton onClick={() => {

                                                        router.push('/admin/users/manager')
                                                    }
                                                    }><FaUserClock />Managers</SideBar_LinkButton>
                                                </LI>
                                                <LI>
                                                    <SideBar_LinkButton onClick={() => {
                                                        router.push('/admin/users/member')}
                                                        }><FaUserAlt />Members</SideBar_LinkButton>
                                                </LI>
                                                
                                            </UL>
                                        </SideBar_SubMenu>
                                    }
                                </LI>
                                <LI>
                                    <SideBar_LinkButton onClick={() => {router.push('/admin/events')}}><FaRegCalendarAlt /> Events</SideBar_LinkButton>
                                </LI>
                                <LI>
                                    <SideBar_LinkButton onClick={() => {router.push('/admin/category')}}><BiCategoryAlt />Category</SideBar_LinkButton>
                                </LI>
                                <LI>
                                    <SideBar_LinkButton onClick={() => {auth?.logout.mutate()}}><FiLogOut />{auth?.logout.isLoading ? "Loading..." : "Logout"}</SideBar_LinkButton>
                                </LI>
                            </UL>
                        </SideBar_Menu>
                    </SideBar_Container>
                </DashboardSideBar>

                <DashboardMain>
                   {children}
                </DashboardMain>
            </DashboardContainer>
        </>
    )

                            
}

export default AdminDashboard