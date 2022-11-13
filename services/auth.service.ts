import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  // deleteUser,
} from 'firebase/auth'

import { auth } from '../firebase.config'
import { userService } from './user.service'

export const authService = {
  register,
  login,
  logout,
  guestLogin,
  onUserChange,
}

async function register(email: string, password: string, displayName: string) {
  const user = await createUserWithEmailAndPassword(auth, email, password)
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL: `/assets/images/discord-avatar-${Math.floor(
        Math.random() * 4
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
  // if (auth.currentUser?.isAnonymous) {
  //   await userService.deleteUser(auth.currentUser.uid)
  //   await deleteUser(auth.currentUser)
  // } else
  await signOut(auth)
}

async function guestLogin() {
  return await signInAnonymously(auth)
}

function onUserChange(onChange: (userCredentials: User | null) => void) {
  return onAuthStateChanged(auth, (userCredentials) => {
    onChange(userCredentials)
  })
}
