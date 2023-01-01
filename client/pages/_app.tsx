import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Container from '../components/layouts/Container'
import AuthContext from '../store/AuthContext'
import EventContext from '../store/EventContext'
import CategoryContext from '../store/CategoryContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <EventContext>
        <CategoryContext>
          <Container>
            <Component {...pageProps} />
          </Container>
        </CategoryContext>
      </EventContext>
    </AuthContext>
  )
}
