import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth'

import { auth } from '../firebase.config'
import { userService } from './user.service'

export const authService = {
  register,
  login,
  logout,
  onUserChange,
}

async function register(email: string, password: string, displayName: string) {
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
}

async function login(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password)
}

async function logout() {
  await signOut(auth)
}

function onUserChange(onChange: (userCredentials: User | null) => void) {
  return onAuthStateChanged(auth, (userCredentials) => {
    onChange(userCredentials)
  })
}
