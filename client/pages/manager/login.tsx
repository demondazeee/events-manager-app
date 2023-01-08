import styled from "styled-components"
import PageContainer from "../../components/layouts/PageContainer"
import Login from "../../components/Login/Login"



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