import { useState } from "react"
import { useFetch } from "./useFetch"

export type UserDataBody = {
    id: string,
    username: string,
    accessToken: string
}

export type LoginMemberBody = {
    username: string,
    password: string
}

export interface useAuthBody {
    isLoading: boolean;
    isLoggedIn: boolean;
    userData: UserDataBody;
    loginUser: ({ username, password }: LoginMemberBody) => Promise<void>;
    refreshToken:() => Promise<void>;
    logoutUser: () => Promise<void>;
}

export const useAuth = () => {
    const [userData, setUserData] = useState<UserDataBody>({id: "", username: "", accessToken: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const {fetchUrl} = useFetch()
    const loginUser = async ({username, password}: LoginMemberBody) => {
        setIsLoading(true)
        const res = await fetchUrl({
            paths: "auth/login",
            method: "POST",
            fetchOptions: {
                body: JSON.stringify({
                    username,
                    password
                })
            }
        })

        if(res == undefined){
            console.log('error')
        } else {
            if(res.ok){
                const data = await res.json();
                setUserData(data)
                setIsLoading(false)
                setIsLoggedIn(true)
            } else {
                console.log("error")
                setIsLoading(false)
                
            }
        }
    }

    const refreshToken = async () => {
        const res = await fetchUrl({
            paths: "auth/refresh",
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
            paths: "auth/logout",
            method: "POST"
        })

        if(res == undefined){
            console.log('error')
        } else {
            if(res.ok){
                setUserData({id: "", username: "", accessToken: ""})
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
        isLoading,
        isLoggedIn,
        userData,
        loginUser,
        refreshToken,
        logoutUser
    }
}