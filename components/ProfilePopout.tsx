import Image from 'next/image'
import {
  ChangeEvent,
  Dispatch,
  LegacyRef,
  SetStateAction,
  useEffect,
  useRef,
} from 'react'
import { useUser } from '../context/UserContext'
import { cloudService } from '../services/cloud.service'
import { userService } from '../services/user.service'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const ProfilePopout = ({ setIsOpen }: Props) => {
  const { user } = useUser()
  const popoutRef: LegacyRef<HTMLDivElement> = useRef(null)

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (!popoutRef.current?.contains(target as Node)) setIsOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [setIsOpen])

  if (!user) return <></>

  const changeAvatar = async (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) return
    try {
      const imageFile = ev.target.files[0]
      const avatarURL = await cloudService.uploadFile('avatars', imageFile)
      await userService.changeUserAvatar(user.id, avatarURL)
    } catch (err) {
      console.error(err)
    }
  }

  const creationTime = new Date(user.creationTime).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

  return (
    <div
      className="absolute -top-3 bg-discord-gray-550 -translate-y-full flex flex-col rounded text-left z-10 gap-10"
      ref={popoutRef}
    >
      <div className="bg-discord-blue-250 rounded-t h-[3.75rem] px-4 relative">
        <div className="h-[92px] w-[92px] rounded-full border-[6px] border-discord-gray-550 absolute bottom-0 translate-y-1/2">
          <input
            id="file-input"
            type="file"
            onChange={changeAvatar}
            accept="image/png, image/jpeg"
            hidden
          />
          <label
            htmlFor="file-input"
            className="fixed flex justify-center items-center h-full w-full z-10 cursor-pointer opacity-0 hover:opacity-100 bg-black bg-opacity-50 rounded-full"
          >
            <h1 className="text-center text-white font-ginto uppercase text-xs border-black">
              Change Avatar
            </h1>
          </label>
          <Image
            className="rounded-full"
            width="100%"
            height="100%"
            src={user.photoURL}
            alt={user.displayName}
          />
        </div>
      </div>
      <div className="bg-discord-gray-600 m-4 rounded px-3 w-72">
        <div className="border-b-[1px] border-discord-gray-200 py-3">
          <h1 className="text-xl font-ginto text-white">{user.displayName}</h1>
        </div>

        <div className="py-3">
          <h1 className="text-xs font-ginto text-white uppercase mb-1">
            Discord member since
          </h1>
          <h2 className="text-sm text-discord-gray-10">{creationTime}</h2>
        </div>
      </div>
    </div>
  )
}

export default ProfilePopout
