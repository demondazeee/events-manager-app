import AdminDashboard from "../../../components/Admin"
import UserManagementPage from "../../../components/Admin/UserManagement"


const UserMemberPage = () => {
  
    return (
        <>
        <AdminDashboard>
            <UserManagementPage role="Member"  />
        </AdminDashboard>
    </>
    )
}

export default UserMemberPage