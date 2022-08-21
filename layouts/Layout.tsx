import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { authService } from '../service/auth.service'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()

  useEffect(() => {
    if (!authService.getCurrentUser()) router.push('/login')
  }, [])

  const isSidebarVisible = router.pathname.includes('conversation') // Only show sidebar on conversation pages

  return (
    <div className="h-screen w-screen flex">
      {isSidebarVisible && <Sidebar />}
      {children}
    </div>
  )
}

export default Layout
