import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Container from '../components/layouts/Container'
import AuthContext from '../store/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <Container>
        <Component {...pageProps} />
      </Container>
    </AuthContext>
  )
}
