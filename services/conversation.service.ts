import { v4 as uuidv4 } from 'uuid'
import { Conversation } from '../models/conversation.model'
import { DiscordUser } from '../models/discord-user.model'
import { Message } from '../models/message.model'
import { dbService } from './db.service'

export const conversationService = {
  getConversation,
  createConversation,
  subscribeToConversation,
  sendMessage,
  getConversationTitleAndPhoto,
}

const COLLECTION = 'conversations'

async function getConversation(conversationId: string): Promise<Conversation> {
  const conversation = await dbService.getItem(COLLECTION, conversationId)
  return conversation as Conversation
}

async function createConversation(membersIds: string[]): Promise<Conversation> {
  const conversation: Conversation = {
    id: uuidv4(),
    membersIds,
    messages: [],
  }
  await dbService.addItem(conversation, COLLECTION, conversation.id)
  return conversation
}

function subscribeToConversation(
  conversationId: string,
  onChange: (conversation: Conversation) => unknown
) {
  return dbService.subscribeToItem(COLLECTION, conversationId, onChange)
}

async function sendMessage(conversationId: string, message: Message) {
  const conversation = await getConversation(conversationId)
  message.id = uuidv4()
  await dbService.updateItem(COLLECTION, conversation.id, {
    messages: [...conversation.messages, message],
  })
}

function getConversationTitleAndPhoto(members: DiscordUser[]) {
  const title = members.map((member) => member.displayName).join(', ')
  const photoURL = members.length > 1 ? '' : members[0].photoURL
  return { title, photoURL }
}
