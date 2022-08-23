import axios from 'axios'
import { log } from 'console'
import { Conversation } from '../models/conversation.model'

export const conversationService = { query, getById }

const BASE_URL = process.env.production
  ? 'api/conversation'
  : 'http://localhost:3000/api/conversation'

async function query(): Promise<Conversation[]> {
  try {
    const { data } = await axios.get(BASE_URL)
    return data
  } catch (error) {
    throw error
  }
}

async function getById(id: string): Promise<Conversation> {
  try {
    const { data } = await axios.get(`${BASE_URL}/${id}`)
    return data
  } catch (error) {
    throw error
  }
}
