import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase.config'
import { userService } from './user.service'

export const authService = { signup, login, logout, getCurrentUser }

async function signup(email: string, password: string, username: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    if (auth.currentUser) {
      updateProfile(auth.currentUser, { displayName: username })
      userService.addUser(auth.currentUser)
    }
  } catch (error) {
    throw error
  }
}

async function login(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
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

async function getCurrentUser() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user)
    })
  })
}
