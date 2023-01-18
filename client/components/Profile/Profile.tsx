import {useContext, useEffect, useState} from "react"
import styled from "styled-components"
import { authContext } from "../../store/AuthContext"
import { eventContext } from "../../store/EventContext"
import { UserDataWithEvents, UserRole } from "../../types/auth"
import { PrimaryButton } from "../elements/Buttons"
import { H3, P } from "../elements/Typography"
import CreateEvents from "../Events/CreateEvents"
import EventList from "../Events/EventList"
import { Card } from "../layouts/Card"
import PageContainer from "../layouts/PageContainer"

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
    const auth = useContext(authContext)
    const {username, events} = data
    const event = useContext(eventContext)
    if(auth == null) { return <P>Loading....</P>}
    if(event == null) {return <P>Loading..</P>}



    return (
        <>
            <PageContainer mainColumn={
                    auth.userData?.username == username && event?.isCreateMode ? 
                    <>
                        <CreateEvents />
                    </>
                    
                    : <EventList eventData={events}/>
                }
                lastColumn={
                    (
                        <>
                            <Card>
                                <UserProfileContainer>

                                    <UserIconContainer>
                                        <UserIcon src="/user-icon.png" alt="user-icon"/>
                                    </UserIconContainer>
                                    <H3>{username}</H3>
                                </UserProfileContainer>
                            </Card>
                            {
                                auth.refresh.isLoading ? <P>Loading...</P> :
                                UserRole.Manager === auth.userData?.role &&
                                auth.userData.username == username &&
                                <Card>
                                    <UserProfileContainer>
                                        <PrimaryButton onClick={
                                            () => {
                                                event ?. setCreateModeHandler(true)
                                            }
                                        }>
                                            Create an Event
                                        </PrimaryButton>
                                    </UserProfileContainer>
                                </Card>
                            } 
                        </>
                    )
                }/>
        </>
    )
}

export default Profile

