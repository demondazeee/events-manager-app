import { useContext, useReducer } from "react"
import styled from "styled-components"
import { authContext } from "../../../store/AuthContext"
import { PrimaryButton } from "../../elements/Buttons"
import { Input } from "../../elements/Inputs"
import { H2, H3 } from "../../elements/Typography"
import Modal from "../../Modal/Modal"

const LoginFormContainer = styled.div`
    min-width: 300px;
    background-color: #fff;
    padding: 3rem;
    border-radius: 3px;
    border: 2.5px solid #000;

    & > *:not(:last-child) {
        margin-bottom: 25px;
    }
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 5rem;
`
const FormInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;

    margin-bottom: 10px;
`
const FormInputContainer = styled.div``

const FormActionContainer = styled.div`
    & > *:not(:last-child) {
        margin-bottom: 15px;
    }
`

type State = {
    username: string,
    usernameIsValid: boolean,
    password: string,
    passwordIsValid: boolean
}

type Action = {
    val: string,
    type: string
}

const defaultState: State = {
    username: "",
    usernameIsValid: false,
    password: "",
    passwordIsValid: false,
}

const reducerFn = (state: State, action: Action) => {
    const {val, type} = action
    switch(type) {
        case "USER_INPUT":
            return {
                ...state,
                username: val
            }
        case "PASSWORD_INPUT":
            return {
                ...state,
                password: val
            }
    }
    return defaultState
}

const Login = () => {
    const auth = useContext(authContext)
    const [state, dispatchFn] = useReducer(reducerFn, defaultState)

    return (
        <>
            <Modal>
                <LoginFormContainer>
                    <H3>Login</H3>
                   <LoginForm>
                        <FormInputs>
                            <FormInputContainer>
                                <Input placeholder="Username"
                                onChange={(e) => {
                                    dispatchFn({val: e.target.value, type: "USER_INPUT"})
                                }}
                                />
                            </FormInputContainer>
                            <FormInputContainer>
                                <Input placeholder="Password" type="password" 
                                 onChange={(e) => {
                                    dispatchFn({val: e.target.value, type: "PASSWORD_INPUT"})
                                }}
                                />
                            </FormInputContainer>
                        </FormInputs>
                        <FormActionContainer>
                            <PrimaryButton onClick={(e) => {
                                e.preventDefault();
                                auth?.loginUser({
                                    username: state.username,
                                    password: state.password
                                })
                                auth?.showLoginHandler()
                            }}>Login</PrimaryButton>
                            <PrimaryButton onClick={(e) => {
                                e.preventDefault();
                                auth?.showLoginHandler()
                            }}>Cancel</PrimaryButton>
                        </FormActionContainer>
                   </LoginForm>
                </LoginFormContainer>
            </Modal>
        </>
    )
}

export default Login