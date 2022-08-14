import { User } from '../models/user.model'
import { SiMaildotru } from 'react-icons/si'

interface Props {
  members: User[]
}

const ConversationHeader = ({ members }: Props) => {
  return (
    <header className="bg-discord-gray-300 drop-shadow-md px-4 py-3">
      <div className="flex items-center gap-2">
        <SiMaildotru className="w-5 h-5 text-discord-gray-50" />
        <h1 className="text-white">{members[0].username}</h1>
      </div>
    </header>
  )
}

export default ConversationHeader
