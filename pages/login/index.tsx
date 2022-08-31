import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import LoginForm from '../../components/LoginForm'
import { useUser } from '../../context/UserContext'
import { authService } from '../api/services/auth.service'

const LoginPage = () => {
  const { setUser } = useUser()
  const router = useRouter()

  const onLogin = async (username: string, password: string) => {
    try {
      const res = await axios.post('/api/auth/login', { username, password })
      const user = res.data
      setUser(user)
      router.push('/')
    } catch (error: any) {
      throw error.response.data
    }
  }

  return (
    <main className="h-full flex items-center justify-center bg-discord-blue-200">
      <LoginForm onLogin={onLogin} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await authService.getCurrentUser()
  if (user)
    return { redirect: { permanent: false, destination: '/conversations' } }
  return { props: {} }
}

export default LoginPage
