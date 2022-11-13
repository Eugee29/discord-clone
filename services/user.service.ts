import { User } from 'firebase/auth'
import { Conversation } from '../models/conversation.model'
import { DiscordUser } from '../models/discord-user.model'
import { dbService } from './db.service'

export const userService = {
  addUser,
  getUser,
  deleteUser,
  getMultipleUsers,
  getAllUsers,
  addConversationToUser,
  subscribeToUser,
}

const COLLECTION = 'users'

async function addUser(user: User) {
  const addedUser: DiscordUser = {
    id: user.uid,
    conversations: [],
    photoURL: user.photoURL || '/assets/images/discord-avatar-guest.png',
    displayName:
      user.displayName ||
      `Guest #${user.uid
        .substring(user.uid.length - 4, user.uid.length)
        .toUpperCase()}`,
    creationTime: user.metadata.creationTime as string,
    isAnonymous: user.isAnonymous,
  }
  await dbService.addItem(addedUser, COLLECTION, user.uid)
  return addedUser
}

async function getUser(userId: string): Promise<DiscordUser> {
  const user = await dbService.getItem(COLLECTION, userId)
  return user as DiscordUser
}

async function deleteUser(userId: string) {
  await dbService.deleteItem(COLLECTION, userId)
}

async function getMultipleUsers(usersIds: string[]) {
  const users = usersIds.map(async (userId) => {
    const user = await getUser(userId)
    return {
      id: user?.id,
      displayName: user?.displayName || '[Deleted Account]',
      photoURL: user?.photoURL || '/assets/images/discord-avatar-guest.png',
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

function subscribeToUser(
  userId: string,
  onChange: (user: DiscordUser) => unknown
) {
  return dbService.subscribeToItem(COLLECTION, userId, onChange)
}

async function getAllUsers(): Promise<DiscordUser[]> {
  const users = (await dbService.getAllItems(COLLECTION)) as DiscordUser[]
  return users.map((user) => ({
    id: user.id,
    displayName: user.displayName,
    photoURL: user.photoURL,
  })) as DiscordUser[]
}
