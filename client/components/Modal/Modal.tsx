import { ReactNode } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

type ModalProp = {
    children: ReactNode
}

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 1000;
`

const ModalContainer = styled.div`
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
`

const Modal = ({children}: ModalProp) => {
    const modalRoot = document.getElementById("modal-root") as HTMLElement

    return ReactDOM.createPortal(
        <>
            <Background />
            <ModalContainer>
                {children}
            </ModalContainer>
        </>,
        modalRoot
    )
}

export default Modal