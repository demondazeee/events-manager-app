import { createContext, ReactNode, useEffect, useState } from "react"
import LoginModal from "../components/Auth/LoginModal"
import { useAuth, useAuthBody } from "../hooks/useAuth"



type AuthContextProp = {
    children: ReactNode
}

interface AuthContextValue extends useAuthBody  {

}

export const authContext = createContext<AuthContextValue | null>(null)

const AuthContext=  ({children}: AuthContextProp) => {
    const auth = useAuth()

    
    useEffect(() => {
        auth.refreshToken()
        if(auth.isLoggedIn) {
            const interval = setInterval(() => {
                auth.refreshToken()
            }, 1000 * 60 * 2)

            return () =>  {
                clearInterval(interval)
            }
        }
    }, [auth.isLoggedIn])

    const contextValue = {
        ...auth
    }


    return (
        <>
            <authContext.Provider value={contextValue}>
                {auth.showLogin && <LoginModal />}
                {children}
            </authContext.Provider>
        </>
    )
}

export default AuthContext