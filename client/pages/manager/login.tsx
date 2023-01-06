import styled from "styled-components"
import PageContainer from "../../components/layouts/PageContainer"
import Login from "../../components/pages/Login/Login"

const TestContainer = styled.div`
    height: 100vh;
`

const ManagerLoginPage = () => {
    
    return (
        <>
            <PageContainer 
                firstColumn={<Login loginTitle="Login as Manager" loginPath="manager"
                 />}
            />
        </>
    )
}

export default ManagerLoginPage