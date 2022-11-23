import Image from 'next/image'
import { useUser } from '../context/UserContext'
import { BiLogOut } from 'react-icons/bi'
import { authService } from '../services/auth.service'
import { useState } from 'react'
import ProfilePopout from './ProfilePopout'

const SidebarFooter = () => {
  const { user } = useUser()
  const [isPopoutOpen, setIsPopoutOpen] = useState(false)

  if (!user) return <></>

  return (
    <footer className="bg-discord-gray-550 p-2 flex items-center relative">
      {isPopoutOpen && <ProfilePopout setIsOpen={setIsPopoutOpen} />}
      <button
        className="flex-1 flex items-center gap-2 p-1 hover:bg-discord-gray-250 rounded cursor-pointer"
        onClick={(ev) => {
          ev.stopPropagation()
          setIsPopoutOpen((isOpen) => !isOpen)
        }}
      >
        <div className="h-8 w-8">
          <Image
            className="rounded-full"
            width="100%"
            height="100%"
            src={user.photoURL}
            alt={user.displayName}
          />
        </div>
        <h1 className="text-sm text-white">{user.displayName}</h1>
      </button>
      <button
        onClick={() => authService.logout()}
        className="rounded cursor-pointer h-full aspect-square flex items-center justify-center p-2 hover:bg-discord-gray-250"
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
