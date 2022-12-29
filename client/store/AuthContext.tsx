import { createContext, ReactNode, useEffect, useState } from "react"
import Login from "../components/pages/Login/Login"
import { useAuth, useAuthBody } from "../hooks/useAuth"

type AuthContextProp = {
    children: ReactNode
}

interface AuthContextValue extends useAuthBody  {
    showLogin: boolean;
    showLoginHandler: () => void;
}

export const authContext = createContext<AuthContextValue | null>(null)

const AuthContext=  ({children}: AuthContextProp) => {
    const [showLogin, setShowLogin] = useState(false)
    const auth = useAuth()
    const showLoginHandler = () => {
        setShowLogin(prev => !prev)
    }

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
        showLogin,
        showLoginHandler,
        ...auth
    }


    return (
        <>
            <authContext.Provider value={contextValue}>
                {showLogin && <Login />}
                {children}
            </authContext.Provider>
        </>
    )
}

export default AuthContext