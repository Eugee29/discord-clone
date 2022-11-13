import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoginForm from '../../components/LoginForm'
import { useUser } from '../../context/UserContext'
import { authService } from '../../services/auth.service'

const LoginPage = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user !== null) router.push('/conversations')
  }, [user, router])

  const onLogin = async (username: string, password: string) => {
    try {
      await authService.login(username, password)
      // router.push('/conversations')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error.code
    }
  }

  const onGuestLogin = async () => {
    await authService.guestLogin()
  }

  return (
    <main className="h-full flex items-center justify-center bg-discord-blue-200">
      <LoginForm onLogin={onLogin} onGuestLogin={onGuestLogin} />
    </main>
  )
}

export default LoginPage
