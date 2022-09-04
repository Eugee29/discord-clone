import Image from 'next/image'
import { DiscordUser } from '../models/discord-user.model'

interface Props {
  user: DiscordUser
}

const UserPreview = ({ user }: Props) => {
  const defaultPhotoURL =
    'https://i.pinimg.com/originals/d0/37/0f/d0370fc08a89f10da14d64718269d4c1.jpg'

  return (
    <div className="rounded-lg px-3 cursor-pointer hover:bg-discord-gray-100 -mb-[1px]">
      <div className="flex items-center gap-3 py-3 border-t-[1px] border-discord-gray-100 ">
        <div className="w-9 h-9">
          <Image
            className="rounded-full"
            src={user.photoURL || defaultPhotoURL}
            width="100%"
            height="100%"
          />
        </div>
        <h2 className="text-white">{user.displayName}</h2>
      </div>
    </div>
  )
}

export default UserPreview
