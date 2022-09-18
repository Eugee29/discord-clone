import { DiscordUser } from '../models/discord-user.model'
import UserPreview from './UserPreview'

interface Props {
  users: DiscordUser[]
  startConversation: (withUserId: string) => void
}

const UserList = ({ users, startConversation }: Props) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <UserPreview user={user} startConversation={startConversation} />
        </li>
      ))}
    </ul>
  )
}

export default UserList
