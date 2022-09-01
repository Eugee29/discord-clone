import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoginForm from '../../components/LoginForm'
import { useUser } from '../../context/UserContext'
import { authService } from '../api/services/auth.service'
import { userService } from '../api/services/user.service'

const LoginPage = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/conversations')
  }, [user])

  if (user)
    return (
      <div className="h-full flex items-center justify-center bg-discord-blue-200" />
    )

  const onLogin = async (username: string, password: string) => {
    try {
      // const res = await axios.post('/api/auth/login', { username, password })
      // const user = res.data
      // const userCredentials =
      await authService.login(username, password)
      // const user = await userService.getUser(userCredentials.user.uid)
      // setUser(user)
      router.push('/conversations')
    } catch (error: any) {
      // throw error.response.data
      throw error.code
    }
  }

  return (
    <main className="h-full flex items-center justify-center bg-discord-blue-200">
      <LoginForm onLogin={onLogin} />
    </main>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const user = await authService.getCurrentUser()
//   if (user)
//     return { redirect: { permanent: false, destination: '/conversations' } }
//   return { props: {} }
// }

export default LoginPage
