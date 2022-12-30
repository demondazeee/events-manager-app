import { useState } from "react"
import styled from "styled-components"
import { UserDataBody, UserDataWithEvents } from "../../../hooks/useAuth"
import { PrimaryButton } from "../../elements/Buttons"
import { H2, H3 } from "../../elements/Typography"
import { Card } from "../../layouts/Card"
import { ContainerLayout } from "../../layouts/Container"
import CreateEvents from "../Events/CreateEvents"
import EventList from "../Events/EventList"

type ProfileProp = {
    data: UserDataWithEvents
}

const ProfileItemContainer = styled(ContainerLayout)`
padding: 50px 0;
`

const SomeContainer = styled.div `
    display: grid;
    grid-template-columns: minmax(0px, .5fr) 1.2fr minmax(200px, .5fr);

    gap: 3rem;
`

const SomeItem = styled.div `
   & > *:not(:last-child) {
    margin-bottom: 20px;
   }
`

const UserProfileContainer = styled.div `
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`

const UserIconContainer = styled.div``

const UserIcon = styled.img`

`


const Profile = ({data}: ProfileProp) => {
    const {username, events} = data
    const [createMode, setCreateMode] = useState(false)

    return (
        <>
             <ProfileItemContainer>
                <SomeContainer>
                    <SomeItem/>
                        {createMode ? <CreateEvents /> : <EventList eventData={events}/>}
                    <SomeItem>
                        <Card>
                            <UserProfileContainer>
                                
                                <UserIconContainer>
                                    <UserIcon src="/user-icon.png" alt="user-icon" />
                                </UserIconContainer>
                                <H3>{username}</H3>
                            </UserProfileContainer>
                        </Card>
                        
                        <Card>
                            <UserProfileContainer>
                               <PrimaryButton onClick={() => {setCreateMode(prev => !prev)}}>
                                Create an Event
                                </PrimaryButton> 
                            </UserProfileContainer>
                        </Card>
                    </SomeItem>
                </SomeContainer>
            </ProfileItemContainer>
        </>
    )
}

export default Profile