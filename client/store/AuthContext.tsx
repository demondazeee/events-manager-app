import { createContext, ReactNode, useEffect, useState } from "react"
import LoginModal from "../components/Auth/LoginModal"
import { useAuth, useAuthBody } from "../hooks/useAuth"



type AuthContextProp = {
    children: ReactNode
}

interface AuthContextValue extends useAuthBody  {
    showLogin: boolean
    showLoginHandler: () => void
}

export const authContext = createContext<AuthContextValue | null>(null)

const AuthContext=  ({children}: AuthContextProp) => {
    const auth = useAuth()


    const contextValue = {
        ...auth,
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