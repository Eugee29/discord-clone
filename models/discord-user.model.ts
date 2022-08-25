import { Conversation } from './conversation.model'

export interface DiscordUser {
  id: string
  displayName: string
  photoURL: string
  conversations: Conversation[]
}
