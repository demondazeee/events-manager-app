import { useRouter } from "next/router";
import { useContext, useState } from "react"
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "react-query"
import { toastContext } from "../../store/ToastContext";
import { isAdmin, isManager, isMember, LoginUserProp, RegisterUserProp, UserDataBody } from "../../types/auth"
import { authApi } from "./api"

export interface useAuthBody {
    isLoggedIn: boolean;
    userData: UserDataBody | undefined;
    refresh: UseQueryResult<unknown, unknown>;
    login: UseMutationResult<unknown, unknown, LoginUserProp, unknown>;
    register: UseMutationResult<unknown, unknown, RegisterUserProp, unknown>
    logout: UseMutationResult<void, unknown, void, unknown>
    showLogin: boolean;
    showLoginHandler: () => void;
}

export const useAuth = () => {
    const [userData, setUserData] = useState<UserDataBody>({id: "",  username: "", accessToken: "", role: 0})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const router = useRouter()
    const {toastMessage} = useContext(toastContext)

    const showLoginHandler = () => {
        setShowLogin(prev => !prev)
    }
    const {
        loginUser,
        refreshToken,
        registerUser,
        logoutUser
    } = authApi()

    const refresh = useQuery(["refresh"], refreshToken, {
        onSuccess: (data) => {
            if(isAdmin(data)) {
                setUserData(data)
                setIsLoggedIn(true)
            }
            if(isManager(data)){
                setUserData(data)
                setIsLoggedIn(true)
            }
            if(isMember(data)){
                setUserData(data)
                setIsLoggedIn(true)
            }
            
        },
        onError: () => {
            setIsLoggedIn(false)
        },
        refetchOnWindowFocus: false,
        retry: 1,
        retryDelay: 500,
        refetchInterval: 1000 * 60 * 2
    })

    const login = useMutation(loginUser, {
        onSuccess: (data) => {
            if(isAdmin(data)) {
                setUserData(data)
                setIsLoggedIn(true)
                toastMessage({message: `Login Success, Welcome ${data.username}!`, toastType: "success"})
            }
            if(isManager(data)){
                setUserData(data)
                setIsLoggedIn(true)
                toastMessage({message: `Login Success, Welcome ${data.username}!`, toastType: "success"})
            }
            if(isMember(data)){
                setUserData(data)
                setIsLoggedIn(true)
                toastMessage({message: `Login Success, Welcome ${data.username}!`, toastType: "success"})
                showLoginHandler()
            }
        },
        onError: (error) => {
            if(error instanceof Error) {
                toastMessage({message: "Invalid Login", toastType: "error"})
            }
        }
    })

    const register = useMutation(registerUser, {
        onSuccess: (data) => {
            if(isAdmin(data)) {
                setUserData(data)
                setIsLoggedIn(true)
                toastMessage({message: `Registration Success, Welcome ${data.username}!`, toastType: "success"})
            }
            if(isManager(data)){
                setUserData(data)
                setIsLoggedIn(true)
                toastMessage({message: `Registration Success, Welcome ${data.username}!`, toastType: "success"})
            }
            if(isMember(data)){
                setUserData(data)
                setIsLoggedIn(true)
                toastMessage({message: `Registration Success, Welcome ${data.username}!`, toastType: "success"})
                showLoginHandler()
            }
        },
        onError: (error) => {
            if(error instanceof Error) {
                toastMessage({message: "Invalid Registration", toastType: "error"})
            }
        }
    })

    const logout = useMutation(logoutUser, {
        onSuccess: (data) => {
            setUserData({id: "",  username: "", accessToken: "", role: 0})
            setIsLoggedIn(false)
            router.push('/')
        },
        onError: (error) => {
            if(error instanceof Error) {
                setIsLoggedIn(true)
            }
        }
    })

    return {
        isLoggedIn,
        userData,
        refresh,
        login,
        logout,
        showLogin,
        showLoginHandler,
        register
    }
}