import { ConversationPreviewModel } from './conversation-preview.model'
import { Message } from './message.model'

export interface Conversation extends ConversationPreviewModel {
  messages: Message[]
}
