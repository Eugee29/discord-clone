import { useRouter } from 'next/router'
import { useEffect } from 'react'
import RegisterForm from '../../components/RegisterForm'
import { useUser } from '../../context/UserContext'
import { authService } from '../../services/auth.service'

const RegisterPage = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/conversations')
  }, [user, router])

  const onRegister = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      await authService.register(email, password, displayName)
      router.push('/conversations')
    } catch (error: any) {
      throw error.code
    }
  }

  return (
    <main className="h-full flex items-center justify-center bg-discord-blue-200">
      <RegisterForm onRegister={onRegister} />
    </main>
  )
}

export default RegisterPage
