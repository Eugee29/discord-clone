import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useUser } from '../context/UserContext'
import { HiMenu } from 'react-icons/hi'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const { user } = useUser()
  const router = useRouter()
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  useEffect(() => {
    if (user === null) router.push('/login')
  }, [user])

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState)
  }

  if (!user) return <div className="h-full bg-discord-gray-300" />

  return (
    <div className="h-full flex">
      <div
        className={`bg-opacity-40 bg-black h-full w-full fixed sm:hidden ${
          !isSidebarVisible && 'hidden'
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className="fixed top-0 left-0 z-20 w-12 h-12 p-2 sm:hidden hover:bg-discord-gray-250"
        onClick={toggleSidebar}
      >
        <HiMenu className="h-full w-full text-white" />
      </div>
      <Sidebar
        conversations={user.conversations}
        isSidebarVisible={isSidebarVisible}
      />
      {children}
    </div>
  )
}

export default Layout
