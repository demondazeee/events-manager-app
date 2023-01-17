import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthContext from '../store/AuthContext'
import EventContext from '../store/EventContext'
// import { ToastContainer } from 'react-toastify';
import {Toaster} from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
import ToastContext from '../store/ToastContext'
import {QueryClient, QueryClientProvider} from 'react-query'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
   <>
   <Toaster />
    <ToastContext>
      <QueryClientProvider client={
        queryClient
      }>
        <AuthContext>
          <EventContext>
            <Component {...pageProps} />
          </EventContext>
        </AuthContext>
      </QueryClientProvider>
    </ToastContext>
   </>
  )
}
