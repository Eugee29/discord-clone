import { NextPage } from 'next'
import { useRouter } from 'next/router'
import LoginForm from '../../components/LoginForm'
import { authService } from '../../service/auth.service'

const LoginPage: NextPage = () => {
  const router = useRouter()

  const onLogin = async (username: string, password: string) => {
    try {
      await authService.login(username, password)
      router.push('/conversations')
    } catch (error: any) {
      throw error
    }
  }

  return (
    <main className="h-full flex items-center justify-center bg-discord-blue-200">
      <LoginForm onLogin={onLogin} />
    </main>
  )
}

export default LoginPage
