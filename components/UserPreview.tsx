import { DiscordUser } from '../models/discord-user.model'

interface Props {
  user: DiscordUser
}

const UserPreview = ({ user }: Props) => {
  return <h1>{user.id}</h1>
}

export default UserPreview
