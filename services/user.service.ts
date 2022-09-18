import { User } from 'firebase/auth'
import { Conversation } from '../models/conversation.model'
import { DiscordUser } from '../models/discord-user.model'
import { dbService } from './db.service'

export const userService = {
  addUser,
  getUser,
  getMultipleUsers,
  getAllUsers,
  addConversationToUser,
}

const COLLECTION = 'users'

async function addUser(user: User) {
  await dbService.addItem(
    {
      id: user.uid,
      conversations: [],
      photoURL: user.photoURL,
      displayName: user.displayName,
    },
    COLLECTION,
    user.uid
  )
}

async function getUser(userId: string): Promise<DiscordUser> {
  const user = await dbService.getItem(COLLECTION, userId)
  return user as DiscordUser
}

async function getMultipleUsers(usersIds: string[]) {
  const users = usersIds.map(async (userId) => {
    const user = await getUser(userId)
    return {
      id: user.id,
      displayName: user.displayName,
      photoURL: user.photoURL,
    } as DiscordUser
  })
  return Promise.all(users)
}

async function addConversationToUser(
  userId: string,
  conversation: Conversation
) {
  const user = await getUser(userId)
  await dbService.updateItem(COLLECTION, user.id, {
    conversations: [...user.conversations, conversation],
  })
}

async function getAllUsers(): Promise<DiscordUser[]> {
  const users = await dbService.getAllItems(COLLECTION)
  return users.map((user) => ({
    id: user.id,
    displayName: user.displayName,
    photoURL: user.photoURL,
  })) as DiscordUser[]
}
