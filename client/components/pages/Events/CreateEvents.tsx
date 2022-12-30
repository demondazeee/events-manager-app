import { useContext, useReducer } from "react"
import styled from "styled-components"
import { useEvents } from "../../../hooks/useEvents"
import { eventContext } from "../../../store/EventContext"
import { PrimaryButton } from "../../elements/Buttons"
import { Input, TextArea } from "../../elements/Inputs"
import { Card } from "../../layouts/Card"


const CreateEventContainer = styled(Card)`
    height: 100%;
`

const CreateEventForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    height: 100%;
`

const CreateEventActionContainer = styled.div`
    display: flex;
    gap: 20em;
`

type State = {
    title: string,
    description: string
}

type Action = {
    val: string,
    type: string
}

const defaultState: State = {
    title: "",
    description: ""
}

const reducerFn = (state: State, action: Action) => {
    const {type, val} = action

    switch(type) {
        case "TITLE_INPUT":
            return {...state, title: val}
        case "DESC_INPUT":
            return {...state, description: val}
    }

    return defaultState
}


const CreateEvents = () =>{
    const [state, dispatchFn] = useReducer(reducerFn, defaultState)
    const event = useContext(eventContext)
    
    return (
        <>
            <CreateEventContainer>
                <CreateEventForm>
                    <Input placeholder="Enter Event Title.." 
                    onChange={(e) => {dispatchFn({val: e.target.value, type: "TITLE_INPUT" })}}
                     />
                    <TextArea placeholder="Enter Description..." 
                     onChange={(e) => {dispatchFn({val: e.target.value, type: "DESC_INPUT" })}}
                    />
                    <CreateEventActionContainer>
                        <PrimaryButton onClick={(e) =>{ 
                        event?.createEvent({
                            title: state.title,
                            description: state.description
                        })}}>Submit Post</PrimaryButton>
                        <PrimaryButton>Cancel</PrimaryButton>
                    </CreateEventActionContainer>
                </CreateEventForm>
            </CreateEventContainer>
        </>
    )
}

export default CreateEvents