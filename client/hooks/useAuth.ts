import { useContext, useState } from "react"
import { EventsDataBody } from "./useEvents"
import { useFetch } from "./useFetch"

import {toast} from 'react-toastify'
import { toastContext } from "../store/ToastContext"
import { useRouter } from "next/router"

export interface UserDataBody  {
    id: string
    username: string
    role: number;
    accessToken: string
}

export interface UserDataWithEvents extends UserDataBody {
    events: EventsDataBody[]
}

export interface AdminUser extends UserDataWithEvents{

}
export interface ManagerUser extends UserDataWithEvents{

}
export interface MemberUser extends UserDataWithEvents{

}

export type LoginMemberBody = {
    username: string,
    password: string
}

type LoginUserProp = {
    path: string,
    userLoginInput: LoginMemberBody
}

export const isAdmin = (data: unknown): data is AdminUser => {
    if(data != null && typeof data === "object"){
        if("role" in data) {
            return data.role === 0
        }
    }
    
    return false
}

export const isManager = (data: unknown): data is ManagerUser => {
    if(data != null && typeof data === "object"){
        if("role" in data) {
            return data.role === 1
        }
    }
    return false
}

export const isMember = (data: unknown): data is MemberUser => {
    if(data != null && typeof data === "object"){
        if("role" in data) {
            return data.role === 2
        }
    }
    return false
}


export interface useAuthBody {
    showLogin: boolean,
    showLoginHandler: () => void,
    isLoading: boolean;
    isLoggedIn: boolean;
    userData: UserDataBody;
    loginUser:  ({ path, userLoginInput: { username, password } }: LoginUserProp) => Promise<void>
    refreshToken:() => Promise<void>;
    logoutUser: () => Promise<void>;
}

export const useAuth = () => {
    const [userData, setUserData] = useState<UserDataBody>({id: "", username: "", role: 0, accessToken: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const {fetchUrl} = useFetch()
    const {toastMessage} = useContext(toastContext)
    const [showLogin, setShowLogin] = useState(false)
    const {push} = useRouter()

    const showLoginHandler = () => {
        setShowLogin(prev => !prev)
    }



    const loginUser = async ({path, userLoginInput: {username, password}}: LoginUserProp) => {
        setIsLoading(true)
        const res = await fetchUrl({
            paths: `user/${path}/login`,
            method: "POST",
            fetchOptions: {
                body: JSON.stringify({
                    username,
                    password
                })
            }
        })

        if(res == undefined){
            console.log('zzzz')

        } else {
            if(res.ok){
                const data: unknown = await res.json();

                if(isAdmin(data)){
                    setUserData(data)
                    setIsLoading(false)
                    setIsLoggedIn(true)
                    toastMessage({
                        message: `Log In successfully! Welcome ${data.username}!`,
                        type: "success"
                    })
                    push(`/admin/dashboard`)
                }
                if(isManager(data)) {
                    setUserData(data)
                    setIsLoading(false)
                    setIsLoggedIn(true)
                    toastMessage({
                        message: `Log In successfully! Welcome ${data.username}!`,
                        type: "success"
                    })
                    push('/')
                }
                if(isMember(data)){
                    setUserData(data)
                    setIsLoading(false)
                    setIsLoggedIn(true)
                    toastMessage({
                        message: `Log In successfully! Welcome ${data.username}!`,
                        type: "success"
                    })
                    showLoginHandler()
                    push('/')
                }
                
            } else {
                toastMessage({
                    message: "Invalid Log in",
                    type: "error"
                })
                setIsLoading(false)
                
            }
        }
    }

    const refreshToken = async () => {
        const res = await fetchUrl({
            paths: "user/refresh",
            method: "POST"
        })

        if(res == undefined){
            console.log('error')
        } else {
            if(res.ok){
                const data = await res.json();
                setUserData(data)
                // setIsLoading(false)
                setIsLoggedIn(true)
            } else {
                console.log("error")
                setIsLoading(false)
                setIsLoggedIn(false)
            }
        }
    }

    const logoutUser = async () => {
        setIsLoading(true)
        const res = await fetchUrl({
            paths: "user/logout",
            method: "POST",
        })

        if(res == undefined){
            console.log('error')
        } else {
            if(res.ok){
                setUserData({id: "", username: "", role: 0, accessToken: ""})
                setIsLoading(false)
                setIsLoggedIn(false)
            } else {
                console.log("error")
                setIsLoading(false)
                setIsLoggedIn(false)
            }
        }
    }


    return {
        showLogin,
        showLoginHandler,
        isLoading,
        isLoggedIn,
        userData,
        loginUser,
        refreshToken,
        logoutUser
    }
}