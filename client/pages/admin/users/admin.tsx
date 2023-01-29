import AdminDashboard from "../../../components/Admin"
import UserManagementPage from "../../../components/Admin/UserManagement"


const UserAdminPage = () => {
  
    return (
        <>
        <AdminDashboard>
            <UserManagementPage role="Admin"  />
        </AdminDashboard>
    </>
    )
}

export default UserAdminPage