import { DiscordUser } from './discord-user.model'

export interface Message {
  id: string
  content: string
  byUserId: string
  sentAt: EpochTimeStamp
}
