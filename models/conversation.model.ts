import { Message } from './message.model'

export interface Conversation {
  id: string
  membersIds: string[]
  messages: Message[]
}
