import { useFetch } from "../useFetch"
import { isAdmin, isManager, isMember, LoginUserProp, RegisterUserProp } from "../../types/auth"



export const authApi = () => {
    const {fetchUrl} = useFetch()
    const refreshToken = async () => {
        const res = await fetchUrl({
            paths: "user/refresh",
            method: "GET"
        })
        
        if(!res.ok){
            throw new Error()
        }
        const data: unknown = await res.json();
        return data
    }


    const loginUser = async ({path, userLoginInput: {username, password}}: LoginUserProp) => {
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

        if(!res.ok) {
            throw new Error("Invalid Login")
        }
        const data: unknown = await res.json()
        return data

        // if(res == undefined){
        //     console.log('zzzz')

        // } else {
        //     if(res.ok){
        //         const data: unknown = await res.json();

        //         if(isAdmin(data)){
        //             setUserData(data)
        //             setIsLoading(false)
        //             setIsLoggedIn(true)
        //             toastMessage({
        //                 message: `Log In successfully! Welcome ${data.username}!`,
        //                 type: "success"
        //             })
        //             push(`/admin/dashboard`)
        //         }
        //         if(isManager(data)) {
        //             setUserData(data)
        //             setIsLoading(false)
        //             setIsLoggedIn(true)
        //             toastMessage({
        //                 message: `Log In successfully! Welcome ${data.username}!`,
        //                 type: "success"
        //             })
        //             push('/')
        //         }
        //         if(isMember(data)){
        //             setUserData(data)
        //             setIsLoading(false)
        //             setIsLoggedIn(true)
        //             toastMessage({
        //                 message: `Log In successfully! Welcome ${data.username}!`,
        //                 type: "success"
        //             })
        //             showLoginHandler()
        //             push('/')
        //         }
                
        //     } else {
        //         toastMessage({
        //             message: "Invalid Log in",
        //             type: "error"
        //         })
        //         setIsLoading(false)
                
        //     }
        }

        const registerUser = async({path, userRegisterInput: {username, password, email}}: RegisterUserProp) => {
            const res = await fetchUrl({
                paths: `user/${path}/register`,
                method: "POST",
                fetchOptions: {
                    body: JSON.stringify({
                        username,
                        password,
                        email
                    })
                }
            })
    
            if(!res.ok){
                throw new Error()
            }
            
            const data: unknown = await res.json()
            return data

        }

    
    const logoutUser = async () => {
        const res = await fetchUrl({
            paths: "user/logout",
            method: "POST",
        })

         
        if(!res.ok){
            throw new Error()
        }
    }
    return {
        loginUser,
        registerUser,
        refreshToken,
        logoutUser
    }

}

   