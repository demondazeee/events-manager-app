import { useContext, useReducer, useState } from "react"
import styled from "styled-components"
import { categoryContext } from "../../../store/CategoryContext"
import { eventContext } from "../../../store/EventContext"
import { PrimaryButton } from "../../elements/Buttons"
import { Input, TextArea } from "../../elements/Inputs"
import { Label } from "../../elements/Labels"
import { Card } from "../../layouts/Card"
import { Editor } from '@tinymce/tinymce-react';




const CreateEventButton = styled(PrimaryButton)`
    display: inline-block;
    width: auto;
`

const CreateEventContainer = styled(Card)`
    height: 100%;
`

const CreateEventForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 1rem;

    height: 100%;
`


const CreateEventDateContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    margin-bottom: auto;
`

const CreateEventDateInputContainer = styled.div``

const CreateEventActionContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

type State = {
    title: string,
    description: string,
    category: string,
    location: string,
    from_date: string,
    to_date: string
    isFree: string
}

type Action = {
    val: string,
    type: string
}

const defaultState: State = {
    title: "",
    description: "",
    category: "Others",
    location: "",
    from_date: "",
    to_date: "",
    isFree: "Free"
}

const reducerFn = (state: State, action: Action) => {
    const {type, val} = action

    switch(type) {
        case "TITLE_INPUT":
            return {...state, title: val}
        case "DESC_INPUT":
            return {...state, description: val}
        case "LOCATION_INPUT":
            return {...state, location: val}
        case "FROM_DATE":
            return {...state, from_date: val}
        case "TO_DATE":
            return {...state, to_date: val}
        case "CATEGORY_INPUT":
            return {...state, category: val}
        case "ISFREE_INPUT":
            return {...state, isFree: val}
            
    }

    return defaultState
}


const CreateEvents = () =>{
    const [state, dispatchFn] = useReducer(reducerFn, defaultState)
    const event = useContext(eventContext)
    const {categoryData} = useContext(categoryContext)
    


    return (
        <>
            <CreateEventContainer>
                <CreateEventForm>
                    <Input placeholder="Enter Event Title.." 
                        onChange={(e) => {dispatchFn({val: e.target.value, type: "TITLE_INPUT" })}}
                        />
                        {/* <TextArea placeholder="Enter Description..." 
                        onChange={(e) => {dispatchFn({val: e.target.value, type: "DESC_INPUT" })}}
                        /> */}
                    <div>
                    <Editor
                        apiKey='q491jmw5dh41v1qu4dt1007rxaezr76jntsd0ompg5vkc12h'
                        //  onInit={(evt, editor) => {setValue(editor.getContent())}}
                        //  initialValue="<p>This is the initial content of the editor.</p>"
                        onEditorChange={(e) => {dispatchFn({val: e, type: "DESC_INPUT" })}}
                        init={{
                        height: 350,
                        menubar: false,
                        // paste_data_images: false,
                        // smart_paste: false,
                        plugins: [
                            'autolink', 'link', 'image'
                        ],
                        toolbar:  [
                            'undo redo | styles | bold italic underline fontfamily | link image',
                            'alignleft aligncenter alignright'
                          ],
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    </div>
                    <CreateEventDateContainer>
                        <CreateEventDateInputContainer>
                            <Label>From: </Label>
                            <input type="datetime-local"
                            onChange={(e)=> {dispatchFn({val: e.target.value, type: "FROM_DATE"})}}
                            />
                        </CreateEventDateInputContainer>
                        <CreateEventDateInputContainer>
                            <Label>To: </Label>
                            <input type="datetime-local" 
                            onChange={(e)=> {dispatchFn({val: e.target.value, type: "TO_DATE"})}}
                            />
                        </CreateEventDateInputContainer>
                    </CreateEventDateContainer>

                    <Input placeholder="Enter Location" 
                        onChange={(e) => {dispatchFn({val: e.target.value, type: "LOCATION_INPUT" })}}
                        />
                    <div>
                        <select defaultValue={state.category} onChange={(e) => {dispatchFn({val: e.target.value, type: "CATEGORY_INPUT"})}}>
                            {categoryData.map(c => (<option key={c.id} value={c.name}>{c.name}</option>))}
                            <option value="Others">Others</option>
                        </select>
                        
                        <div>
                            <Label htmlFor="isFree">
                            Free
                            </Label>
                            <input id="isFree"
                             value="Free" type="radio"
                              checked={state.isFree == "Free"} 
                              onChange={(e)=>{
                                dispatchFn({val: e.target.value, type: "ISFREE_INPUT"})
                              }}/>
                        </div>
                            <Label htmlFor="isPaid">
                                Paid
                            </Label>
                                <input 
                                id="isPaid"
                                type="radio"
                                value="Paid"
                                checked={state.isFree == "Paid"} 
                                onChange={(e)=>{
                                    dispatchFn({val: e.target.value, type: "ISFREE_INPUT"})
                                  }}
                                />
                        </div>
                    <CreateEventActionContainer>
                        <CreateEventButton onClick={(e) =>{
                        e.preventDefault() 
                        event?.createEvent({
                            title: state.title,
                            description: state.description,
                            FromDate: new Date(state.from_date).toUTCString(),
                            ToDate: new Date(state.to_date).toUTCString(),
                            Location: state.location,
                            Category: state.category,
                            IsFree: state.isFree == "Free"
                        })}}>Submit Post</CreateEventButton>
                        <CreateEventButton onClick={(e) => {
                            e.preventDefault();
                            event?.setCreateModeHandler(false)
                        }}>Cancel</CreateEventButton>
                    </CreateEventActionContainer>
                    
                </CreateEventForm>
            </CreateEventContainer>
        </>
    )
}

export default CreateEvents