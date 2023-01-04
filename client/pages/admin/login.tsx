import PageContainer from "../../components/layouts/PageContainer"
import Login from "../../components/pages/Login/Login"

const AdminLoginPage = () => {
    return (
        <>
            <PageContainer mainColumn={
                <Login loginPath="admin" />
            } />
        </>
    )
}


export default AdminLoginPage