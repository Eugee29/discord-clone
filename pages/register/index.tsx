import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import RegisterForm from '../../components/RegisterForm'
import { useUser } from '../../context/UserContext'
import { authService } from '../api/services/auth.service'

const RegisterPage = () => {
  const { setUser } = useUser()
  const router = useRouter()

  const onRegister = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const res = await axios.post('/api/auth/signup', {
        email,
        password,
        displayName,
      })
      const user = res.data
      setUser(user)
      router.push('/conversations')
    } catch (error: any) {
      throw error.response.data
    }
  }

  return (
    <main className="h-full flex items-center justify-center bg-discord-blue-200">
      <RegisterForm onRegister={onRegister} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await authService.getCurrentUser()
  if (user)
    return { redirect: { permanent: false, destination: '/conversations' } }
  return { props: {} }
}

export default RegisterPage
