import { useRouter } from 'next/router'
import Sidebar from '../components/Sidebar'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()

  const isSidebarVisible = router.pathname.includes('conversation') // Only show sidebar on conversation pages

  return (
    <div className="h-screen w-screen flex">
      {isSidebarVisible && <Sidebar />}
      {children}
    </div>
  )
}

export default Layout
