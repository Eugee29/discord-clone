import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { DiscordUser } from '../models/discord-user.model'
import { auth, db } from '../firebase.config'
import { userService } from './user.service'
import { doc, onSnapshot } from 'firebase/firestore'

export const authService = {
  register,
  login,
  logout,
  onUserChange,
}

async function register(email: string, password: string, displayName: string) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName })
      userService.addUser(auth.currentUser)
    }
    return user
  } catch (error) {
    throw error
  }
}

async function login(email: string, password: string) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)

    return user
  } catch (error) {
    throw error
  }
}

async function logout() {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

async function onUserChange(
  setUser: (user: DiscordUser | null | undefined) => void
) {
  return onAuthStateChanged(auth, async (userCredentials) => {
    if (!userCredentials) return setUser(null) // No user is logged in
    setUser(undefined) // Loading user
    const user = await userService.getUser(userCredentials?.uid)

    // const unsub = onSnapshot(doc(db, 'users', user?.id), (doc) => {
    //   cb(doc.data() as DiscordUser)
    // })

    setUser(user) // User logged in
  })
}
