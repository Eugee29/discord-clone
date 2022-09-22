import Image from 'next/image'
import { DiscordUser } from '../models/discord-user.model'

interface Props {
  user: DiscordUser
  startConversation: (withUserId: string) => void
}

const UserPreview = ({ user, startConversation }: Props) => {
  return (
    <div
      className="rounded-lg px-3 cursor-pointer hover:bg-discord-gray-100 -mb-[1px]"
      onClick={() => startConversation(user.id)}
    >
      <div className="flex items-center gap-3 py-3 border-t-[1px] border-discord-gray-100 ">
        <div className="w-9 h-9">
          <Image
            className="rounded-full"
            src={user.photoURL}
            alt={`${user.displayName}'s profile picture`}
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
