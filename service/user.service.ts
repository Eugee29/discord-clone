import { User } from 'firebase/auth'
import { dbService } from './db.service'

export const userService = { addUser, getUser }

const COLLECTION = 'users'

async function addUser(user: User) {
  await dbService.addItem({ conversations: [] }, COLLECTION, user.uid)
}

async function getUser(userId: string) {
  const user = await dbService.getItem(COLLECTION, userId)
  return user
}
