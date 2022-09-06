import { v4 as uuidv4 } from 'uuid'
import { Conversation } from '../models/conversation.model'
import { DiscordUser } from '../models/discord-user.model'
import { dbService } from './db.service'

export const conversationService = {
  getConversation,
  createConversation,
}

const COLLECTION = 'conversations'

async function getConversation(conversationId: string): Promise<Conversation> {
  const conversation = await dbService.getItem(COLLECTION, conversationId)
  return conversation as Conversation
}

async function createConversation(users: DiscordUser[]): Promise<Conversation> {
  const conversation: Conversation = {
    id: uuidv4(),
    members: users.map((user: DiscordUser) => ({
      id: user.id,
      displayName: user.displayName,
      photoURL: user.photoURL,
    })) as DiscordUser[],
    messages: [],
  }
  await dbService.addItem(conversation, COLLECTION, conversation.id)
  return conversation
}
