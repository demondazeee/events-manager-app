import styled from "styled-components"
import { ContainerLayout } from "../../components/layouts/Container"
import PageContainer from "../../components/layouts/PageContainer"
import Login from "../../components/Auth/Auth"
import { useContext } from "react"
import { authContext } from "../../store/AuthContext"
import { useRouter } from "next/router"
import { P } from "../../components/elements/Typography"

const ManagerLoginLayout = styled(ContainerLayout)`
    padding-top: 60px;
    max-width: 500px;
`


const ManagerLoginPage = () => {
    const auth = useContext(authContext)
    const router = useRouter()

    if(auth == null) {return <P>Loading...</P>}

    if(auth.refresh.isLoading) {return <P>Loading....</P>}

    if(auth.isLoggedIn)
    {router.push('/')}
    else {
        return (
            <>
            <ManagerLoginLayout>
            <Login loginTitle="Login as Manager" loginPath="manager"
                    />
            </ManagerLoginLayout>
            </>
        )
    }
}

export default ManagerLoginPage