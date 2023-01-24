"use client"

import styled from "styled-components"

import { FiLogOut } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegCalendarAlt, FaUsersCog, FaUsers } from "react-icons/fa";
import { ReactNode, useContext } from "react"
import { Card } from "../layouts/Card";
import { H2, H3 } from "../elements/Typography";
import { LI, UL } from "../elements/Lists";
import Charts from "./Charts";
import { authContext } from "../../store/AuthContext";
import Dashboard from "./Dashboard";
import { useRouter } from "next/router";


const DashboardContainer = styled.div`
    position: relative;
    height: 100vh;

    display: flex;
`

const DashboardSideBar = styled.div`
    flex-basis: 250px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
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
    height: 100%;
    flex-basis: 100%;
    margin-left: 250px;
    padding: 1rem;
`

type AdminDashboardProps = {
    children: ReactNode
}

const AdminDashboard = ({children}: AdminDashboardProps) => {
    const auth  = useContext(authContext)
    const router = useRouter()


    return (
        <>
            <DashboardContainer>
                <DashboardSideBar>
                    <SideBar_Container>
                        <H2>Username</H2>
                        <SideBar_Menu>
                            <UL>
                                <LI>
                                    <SideBar_LinkButton onClick={() => {router.push('/admin/dashboard')}}><FaUsersCog />Dashboard</SideBar_LinkButton>
                                </LI>
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