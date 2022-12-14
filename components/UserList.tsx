import { DiscordUser } from '../models/discord-user.model'
import UserPreview from './UserPreview'

interface Props {
  users: DiscordUser[]
  startConversation: (withUserId: string) => void
}

const UserList = ({ users, startConversation }: Props) => {
  return (
    <ul className="overflow-auto px-4 flex flex-1 flex-col mr-1 custom-scrollbar pb-2">
      {users.map((user) => (
        <li key={user.id}>
          <UserPreview user={user} startConversation={startConversation} />
        </li>
      ))}
    </ul>
  )
}

export default UserList
