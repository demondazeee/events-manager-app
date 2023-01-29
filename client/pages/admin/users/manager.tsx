import AdminDashboard from "../../../components/Admin"
import UserManagementPage from "../../../components/Admin/UserManagement"


const UserManagerPage = () => {
  
    return (
        <>
        <AdminDashboard>
            <UserManagementPage role="Manager"  />
        </AdminDashboard>
    </>
    )
}

export default UserManagerPage