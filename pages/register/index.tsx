import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import RegisterForm from '../../components/RegisterForm'
import { useUser } from '../../context/UserContext'
import { authService } from '../api/services/auth.service'

const RegisterPage = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/conversations')
  }, [user])

  if (user)
    return (
      <div className="h-full flex items-center justify-center bg-discord-blue-200" />
    )

  const onRegister = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      // const res = await axios.post('/api/auth/signup', {
      //   email,
      //   password,
      //   displayName,
      // })
      // const user = res.data
      // setUser(user)
      await authService.register(email, password, displayName)
      router.push('/conversations')
    } catch (error: any) {
      // throw error.response.data
      throw error.code
    }
  }

  return (
    <main className="h-full flex items-center justify-center bg-discord-blue-200">
      <RegisterForm onRegister={onRegister} />
    </main>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const user = await authService.getCurrentUser()
//   if (user)
//     return { redirect: { permanent: false, destination: '/conversations' } }
//   return { props: {} }
// }

export default RegisterPage
