import {GetServerSideProps} from "next"
import Profile from "../../components/pages/Profile/Profile"
import {UserDataWithEvents} from "../../hooks/useAuth"


type ProfilePageProp = {
    data: UserDataWithEvents
}



const ProfilePage = ({data} : ProfilePageProp) => {


    return (
        <>
           <Profile data={data} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {params} = context
    const url = process.env.NEXT_PUBLIC_SERVER

    const res = await fetch(`${url}/user/${
        params ?. userName
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
