import { User } from 'firebase/auth'
import { dbService } from './db.service'

export const userService = { addUser }

const COLLECTION = 'users'

function addUser(user: User) {
  dbService.addItem({ conversations: [] }, COLLECTION, user.uid)
}
