import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { DiscordUser } from '../models/discord-user.model'
import { auth } from '../firebase.config'
import { userService } from './user.service'

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
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: `/assets/images/discord-avatar-${Math.floor(
          Math.random() * 5
        )}.png`,
      })
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

function onUserChange(onChange: (parameter: any) => void) {
  return onAuthStateChanged(auth, async (userCredentials) => {
    if (!userCredentials) return onChange(null) // No user is logged in
    onChange(undefined) // Loading user
    const user = await userService.getUser(userCredentials?.uid)
    onChange(user)
  })
}
