import { createContext, ReactNode } from 'react';
import toast from 'react-hot-toast';

type ToastOption = {
    message: string,
    toastType: string
}

type ToastContextProp = {
    children: ReactNode
}

type ToastContextValue = {
    toastMessage: ({message}: ToastOption) => void
}


export const toastContext = createContext<ToastContextValue>({
    toastMessage: ({message, toastType}: ToastOption) => {}
})


const ToastContext = ({children}: ToastContextProp) => {

    const toastMessage = ({message, toastType}: ToastOption) => {
        if(toastType == "success") {
            toast.success(message, {
                position: "top-right",
                style: {
                    fontSize: "1.5rem"
                },
                duration: 4000
            })
        }
        if(toastType == "error") {
            toast.error(message, {
                position: "top-right",
                style: {
                    fontSize: "1.5rem"
                },
                duration: 4000
            })
        }
    }


    return (
        <toastContext.Provider value={{toastMessage}}>
            {children}
        </toastContext.Provider>
    )
}

export default ToastContext