import { NextPage } from 'next'
import LoginForm from '../../components/LoginForm'

const LoginPage: NextPage = () => {
  return (
    <main className="flex-1 flex items-center justify-center bg-discord-blue-200">
      <LoginForm />
    </main>
  )
}

export default LoginPage
