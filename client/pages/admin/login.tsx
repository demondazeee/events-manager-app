import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { P } from "../../components/elements/Typography"
import PageContainer from "../../components/layouts/PageContainer"
import Login from "../../components/Login/Login"
import { authContext } from "../../store/AuthContext"

const AdminLoginPage = () => {


    return (
        <>
            <PageContainer mainColumn={
                <Login loginPath="admin" loginTitle="Login as Admin" />
            } />
        </>
    )
}


export default AdminLoginPage
