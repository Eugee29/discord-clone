import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useUser } from '../context/UserContext'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user === null) router.push('/login')
  }, [user])

  return (
    <div className="h-full w-full flex">
      <Sidebar conversations={user?.conversations || []} />
      {children}
    </div>
  )
}

export default Layout
