import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase.config'

export const authService = { signup, login, logout, getCurrentUser }

async function signup(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
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

function getCurrentUser() {
  return auth.currentUser
}
