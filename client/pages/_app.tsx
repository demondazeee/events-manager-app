import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Container from '../components/layouts/Container'
import AuthContext from '../store/AuthContext'
import EventContext from '../store/EventContext'
import CategoryContext from '../store/CategoryContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastContext from '../store/ToastContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
   <>
   <ToastContainer />
    <ToastContext>
      <AuthContext>
        <EventContext>
            <Container>
              <Component {...pageProps} />
            </Container>
        </EventContext>
      </AuthContext>
    </ToastContext>
   </>
  )
}
