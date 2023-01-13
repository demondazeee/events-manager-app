import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useReducer, useState } from "react"
import styled from "styled-components"
import { isAdmin } from "../../hooks/useAuth"
import { useFetch } from "../../hooks/useFetch"
import { authContext } from "../../store/AuthContext"
import { LoginComponentProps } from "../../types/Login"
import { PrimaryButton } from "../elements/Buttons"
import { Input } from "../elements/Inputs"
import { H3, P } from "../elements/Typography"


const AuthFormContainer = styled.div`
    min-width: 300px;
    background-color: #fff;
    padding: 3rem;
    border-radius: 3px;
    border: 2.5px solid #000;

    & > *:not(:last-child) {
        margin-bottom: 25px;
    }
`

const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    padding-bottom: 5rem;
    gap: 5rem;

    border-bottom: 1px solid #444;
`
const LoginFooterContainer = styled.footer`
    & > * {
        color: #444;
        font-size: 1.2rem;
    }
`

const AuthLinkButton = styled.a`
    text-decoration: underline;
    color: #E11845;
    font-weight: 600;

    &:hover {
        cursor: pointer;
        
    }
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
    passwordIsValid: boolean,
    email: string,
    emailIsValid: false
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
    email: "",
    emailIsValid: false,
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
        case "EMAIL_INPUT":
            return {
                ...state,
                email: val
            }
    }
    return defaultState
}

const Auth = ({loginPath, loginTitle}: LoginComponentProps) => {
    const title = loginTitle || "Login"
    const auth = useContext(authContext)
    const [registerMode, setRegisterMode] = useState(false)
    const [state, dispatchFn] = useReducer(reducerFn, defaultState)
    const {push} = useRouter()
    const {fetchUrl} = useFetch()
    
    const router = useRouter()
    if(!auth) {
        return <P>Loading</P>
    }

    useEffect(() => {
        const refresh = async () =>{
            const res = await fetchUrl({
                paths: "user/refresh",
                method: "POST"
            })
    
            if(res == undefined){
                console.log('error')
            } else {
                if(res.ok){
                    const data: unknown = await res.json()

                    if(isAdmin(data)) {
                        router.push('/admin/dashboard')
                    }
                    router.push('/')
                }
            }
        }
        refresh()
    }, [])

    // console.log(auth.isLoggedIn)

    return (
        <>
           <AuthFormContainer>
                    <H3>{!registerMode ? title : "Register a User"}</H3>
                   <AuthForm>
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
                            {registerMode &&
                            <FormInputContainer>
                            <Input placeholder="Email" type="email" 
                             onChange={(e) => {
                                dispatchFn({val: e.target.value, type: "EMAIL_INPUT"})
                            }}
                            />
                            </FormInputContainer>
                            }
                        </FormInputs>
                        <FormActionContainer>
                            {
                                !registerMode ?
                                <PrimaryButton onClick={(e) => {
                                    e.preventDefault();
                                    auth.loginUser({
                                        path: loginPath,
                                       userLoginInput: {
                                        username: state.username,
                                        password: state.password
                                       }
                                    })
                                }}>Login</PrimaryButton>
                                :
                                <PrimaryButton onClick={(e) => {
                                    e.preventDefault();
                                    auth.registerUser({
                                        path: loginPath,
                                        userRegisterInput: {
                                            username: state.username,
                                            password: state.password,
                                            email: state.email
                                        }
                                    })
                                }}>
                                    Register
                                </PrimaryButton>
                                
                            }
                            <PrimaryButton onClick={(e) => {
                                e.preventDefault();
                                
                                loginPath != "admin" && loginPath != "manager" ? 
                                auth?.showLoginHandler()
                                : push('/')
                            }}>Cancel</PrimaryButton>
                        </FormActionContainer>
                   </AuthForm>
                  {loginPath != "admin" && 
                <LoginFooterContainer>
                  {
                     !registerMode ? 
                     <P>New User? <AuthLinkButton onClick={() => {setRegisterMode(prev => !prev)}}>Sign up FREE Now</AuthLinkButton></P>
                     : <P>Got an Account? <AuthLinkButton onClick={() => {setRegisterMode(prev => !prev)}}>Sign in HERE</AuthLinkButton></P>
                  }
                </LoginFooterContainer>}
            </AuthFormContainer>
        </>
    )
}

export default Auth