import Modal from "../Modal/Modal"
import Login from "./Login"

const LoginModal = () => {
    return (
        <>
            <Modal>
                <Login loginPath="member" />
            </Modal>
        </>
    )
}

export default LoginModal