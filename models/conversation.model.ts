// import { ConversationPreviewModel } from './conversation-preview.model'
import { DiscordUser } from './discord-user.model'
import { Message } from './message.model'

export interface Conversation {
  id: string
  members: DiscordUser[]
  messages: Message[]
}
