import { DiscordUser } from '../models/discord-user.model'
import UserPreview from './UserPreview'

interface Props {
  users: DiscordUser[]
}

const UserList = ({ users }: Props) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <UserPreview user={user} />
        </li>
      ))}
    </ul>
  )
}

export default UserList
