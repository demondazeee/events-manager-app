import {useContext, useEffect, useState} from "react"
import styled from "styled-components"
import {UserDataBody, UserDataWithEvents} from "../../../hooks/useAuth"
import { authContext } from "../../../store/AuthContext"
import { eventContext } from "../../../store/EventContext"
import {PrimaryButton} from "../../elements/Buttons"
import {H2, H3} from "../../elements/Typography"
import {Card} from "../../layouts/Card"
import PageContainer from "../../layouts/PageContainer"
import CreateEvents from "../Events/CreateEvents"
import EventList from "../Events/EventList"

type ProfileProp = {
    data: UserDataWithEvents
}

const ProfileItemContainer = styled.div `
    padding: 50px 0;
`

const SomeContainer = styled.div `
    display: flex;

    gap: 3rem;
`

const SomeItem = styled.div `
    flex: 1;
   & > *:not(:last-child) {
    margin-bottom: 20px;
   }
`
const MainContainer = styled.div `
flex: 2;

`

const UserProfileContainer = styled.div `
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`

const UserIconContainer = styled.div ``

const UserIcon = styled.img `

`


const Profile = ({data} : ProfileProp) => {
    const loggedInUser = useContext(authContext)
    const {username, events} = data
    const event = useContext(eventContext)
    useEffect(() => {
        event?.setDefaultData(events)
    }, [])
    

    return (
        <>
            <PageContainer 
            mainColumn={
                loggedInUser?.userData.username == username && event?.isCreateMode ? <CreateEvents/>
                : 
                    <EventList eventData={event!.eventsData}/>

                }
            lastColumn={(
                <>
                <Card>
                        <UserProfileContainer>

                            <UserIconContainer>
                                <UserIcon src="/user-icon.png" alt="user-icon"/>
                            </UserIconContainer>
                            <H3>{username}</H3>
                        </UserProfileContainer>
                    </Card>
                    {loggedInUser?.userData.username == username &&
                    <Card>
                        <UserProfileContainer>
                            <PrimaryButton onClick={
                                () => {
                                    event?.setCreateModeHandler(true)
                                }
                            }>
                                Create an Event
                            </PrimaryButton>
                        </UserProfileContainer>
                     </Card>
                    }
                </>
            )}/>
        </>
    )
}

export default Profile

