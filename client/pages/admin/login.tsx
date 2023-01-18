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
    const auth = useContext(authContext)
    const router = useRouter()

    if(auth == null) {return <P>Loading...</P>}

    if(auth.refresh.isLoading) {return <P>Loading....</P>}

    if(auth.isLoggedIn)
    {router.push('/admin/dashboard')}
    else {
        return (
            <>
            <AdminLoginLayout>
                <Login loginPath="admin" loginTitle="Login as Admin" />
            </AdminLoginLayout>
            </>
        )
    }
}


export default AdminLoginPage
