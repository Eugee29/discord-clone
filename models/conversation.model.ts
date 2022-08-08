import { Message } from './message.model'
import { User } from './user.model'

export interface Conversation {
  id: string
  members: User[]
  messages: Message[]
}
