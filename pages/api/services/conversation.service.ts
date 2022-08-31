import { Conversation } from '../../../models/conversation.model'
import { dbService } from './db.service'

export const conversationService = { getConversation }

const COLLECTION = 'conversations'

async function getConversation(conversationId: string): Promise<Conversation> {
  const conversation = await dbService.getItem(COLLECTION, conversationId)
  return conversation as Conversation
}
