import { useRouter } from 'next/router'
import RegisterForm from '../../components/RegisterForm'
import { useUser } from '../../context/UserContext'
import { authService } from '../../service/auth.service'
import { userService } from '../../service/user.service'

const RegisterPage = () => {
  const { setUser } = useUser()
  const router = useRouter()

  const onRegister = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const user = await authService.signup(email, password, username)
      setUser(await userService.getUser(user.user.uid))
      router.push('/conversations')
    } catch (error: any) {
      throw error
    }
  }

  return (
    <main className="h-full flex items-center justify-center bg-discord-blue-200">
      <RegisterForm onRegister={onRegister} />
    </main>
  )
}

export default RegisterPage
