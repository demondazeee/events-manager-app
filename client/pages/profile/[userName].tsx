import {GetServerSideProps} from "next"
import Layout from "../../components/layouts/Container"
import Profile from "../../components/Profile/Profile"
import { UserDataWithEvents } from "../../types/auth"



type ProfilePageProp = {
    data: UserDataWithEvents
}



const ProfilePage = ({data} : ProfilePageProp) => {


    return (
        <>
           <Layout title={data.user.username}>
            <Profile data={data} />
           </Layout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {params} = context
    const url = process.env.NEXT_PUBLIC_SERVER

    const res = await fetch(`${url}/user/${
        params?.userName
    }`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })

    if (res.ok) {
        const data = await res.json();
        return {props: {
                data
            }}
    } else {
        return {notFound: true}
    }

}

export default ProfilePage
