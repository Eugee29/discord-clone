import { Conversation } from '../models/conversation.model'
import { dbService } from './db.service'

export const conversationService = { getConversation }

const COLLECTION = 'conversations'

// const BASE_URL = process.env.production
//   ? 'api/conversation'
//   : 'http://localhost:3000/api/conversation'

// async function query(): Promise<Conversation[]> {
//   try {
//     const { data } = await axios.get(BASE_URL)
//     return data
//   } catch (error) {
//     throw error
//   }
// }

// async function getById(id: string): Promise<Conversation> {
//   try {
//     const { data } = await axios.get(`${BASE_URL}/${id}`)
//     return data
//   } catch (error) {
//     throw error
//   }
// }

async function getConversation(conversationId: string): Promise<Conversation> {
  const conversation = await dbService.getItem(COLLECTION, conversationId)
  return conversation as Conversation
}
