import { NextPage } from 'next'
import { useRouter } from 'next/router'
import LoginForm from '../../components/LoginForm'
import Meta from '../../components/Meta'
import { useUser } from '../../context/UserContext'
import { authService } from '../../service/auth.service'
import { userService } from '../../service/user.service'

const LoginPage: NextPage = () => {
  const { setUser } = useUser()
  const router = useRouter()

  const onLogin = async (username: string, password: string) => {
    try {
      const user = await authService.login(username, password)
      setUser(await userService.getUser(user.user.uid))
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
