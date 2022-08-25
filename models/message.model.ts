import { DiscordUser } from './discord-user.model'

export interface Message {
  id: string
  content: string
  user: DiscordUser
  sentAt: EpochTimeStamp
}
