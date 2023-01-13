import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { P } from "../../components/elements/Typography"
import { ContainerLayout } from "../../components/layouts/Container"
import PageContainer from "../../components/layouts/PageContainer"
import Login from "../../components/Auth/Auth"
import { authContext } from "../../store/AuthContext"

const AdminLoginLayout = styled(ContainerLayout)`
    padding-top: 60px;
    max-width: 500px;
`

const AdminLoginPage = () => {


    return (
        <>
           <AdminLoginLayout>
            <Login loginPath="admin" loginTitle="Login as Admin" />
           </AdminLoginLayout>
        </>
    )
}


export default AdminLoginPage
