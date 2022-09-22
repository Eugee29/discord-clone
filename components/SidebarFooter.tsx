import Image from 'next/image'
import { useUser } from '../context/UserContext'
import { BiLogOut } from 'react-icons/bi'
import { authService } from '../services/auth.service'

const SidebarFooter = () => {
  const { user } = useUser()

  if (!user) return <></>

  return (
    <footer className="bg-discord-gray-550 p-[0.625rem] flex items-center">
      <div className="flex-1 flex items-center gap-2">
        <div className="h-8 w-8 ">
          <Image
            className="rounded-full"
            width="100%"
            height="100%"
            src={user.photoURL}
            alt={user.displayName}
          />
        </div>
        <h1 className="text-sm text-white">{user.displayName}</h1>
      </div>
      <button
        onClick={() => authService.logout()}
        className="rounded cursor-pointer h-full aspect-square flex items-center justify-center p-1 hover:bg-discord-gray-250 "
        title="Logout"
      >
        <BiLogOut
          className="h-full w-full text-discord-gray-50"
          aria-label="logout"
        />
      </button>
    </footer>
  )
}

export default SidebarFooter
