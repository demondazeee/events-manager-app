import { createContext, ReactNode } from "react"
import { Theme, TypeOptions, toast } from "react-toastify"

type ToastOption = {
    message: string,
    type: TypeOptions
}

type ToastContextProp = {
    children: ReactNode
}

type ToastContextValue = {
    toastMessage: ({message, type}: ToastOption) => void
}


export const toastContext = createContext<ToastContextValue>({
    toastMessage: ({message, type}: ToastOption) => {}
})


const ToastContext = ({children}: ToastContextProp) => {

    const toastMessage = ({message,  type}: ToastOption) => {
        toast(message, {
            theme: "dark",
            type
        })
    }


    return (
        <toastContext.Provider value={{toastMessage}}>
            {children}
        </toastContext.Provider>
    )
}

export default ToastContext