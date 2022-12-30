import {GetServerSideProps} from "next"
import styled from "styled-components"
import { PrimaryButton } from "../../components/elements/Buttons"
import {H2, H3} from "../../components/elements/Typography"
import {Card} from "../../components/layouts/Card"
import {ContainerLayout} from "../../components/layouts/Container"
import {PageContainer} from "../../components/layouts/PageContainer"
import EventList from "../../components/pages/Events/EventList"
import Profile from "../../components/pages/Profile/Profile"
import {UserDataBody, UserDataWithEvents} from "../../hooks/useAuth"
import { GrAdd } from "react-icons/gr"

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
