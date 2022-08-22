import { useRouter } from 'next/router'
import RegisterForm from '../../components/RegisterForm'
import { authService } from '../../service/auth.service'

const RegisterPage = () => {
  const router = useRouter()

  const onRegister = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      await authService.signup(email, password, username)
      router.push('/conversations')
    } catch (error: any) {
      throw error
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center bg-discord-blue-200">
      <RegisterForm onRegister={onRegister} />
    </main>
  )
}

export default RegisterPage
