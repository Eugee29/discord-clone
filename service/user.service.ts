import { User } from 'firebase/auth'
import { DiscordUser } from '../models/discord-user.model'

import { dbService } from './db.service'

export const userService = { addUser, getUser, getAllUsers }

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

async function getAllUsers(): Promise<DiscordUser[]> {
  const users = await dbService.getAllItems(COLLECTION)
  return users.map((user) => ({
    id: user.id,
    displayName: user.displayName,
    photoURL: user.photoURL,
  })) as DiscordUser[]
}
