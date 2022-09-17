import { v4 as uuidv4 } from 'uuid'
import { Conversation } from '../models/conversation.model'
import { DiscordUser } from '../models/discord-user.model'
import { dbService } from './db.service'

export const conversationService = {
  getConversation,
  createConversation,
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

function getConversationTitleAndPhoto(
  members: DiscordUser[],
  currUserId: string
) {
  const membersWithoutCurrUser = members.filter(
    (member) => member.id !== currUserId
  )

  const title = membersWithoutCurrUser
    .map((member) => member.displayName)
    .join(', ')

  const photoURL =
    membersWithoutCurrUser.length > 1 ? '' : membersWithoutCurrUser[0].photoURL

  return { title, photoURL }
}
