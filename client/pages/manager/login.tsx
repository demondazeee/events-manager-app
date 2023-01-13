import styled from "styled-components"
import { ContainerLayout } from "../../components/layouts/Container"
import PageContainer from "../../components/layouts/PageContainer"
import Login from "../../components/Auth/Auth"

const ManagerLoginLayout = styled(ContainerLayout)`
    padding-top: 60px;
    max-width: 500px;
`


const ManagerLoginPage = () => {
    
    return (
        <>
          <ManagerLoginLayout>
          <Login loginTitle="Login as Manager" loginPath="manager"
                 />
          </ManagerLoginLayout>
        </>
    )
}

export default ManagerLoginPage