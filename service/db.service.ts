import { doc, getDoc, query, setDoc } from 'firebase/firestore'
import { db } from '../firebase.config'

export const dbService = { addItem, getItem }

async function addItem(item: any, collection: string, key: string) {
  await setDoc(doc(db, collection, key), item)
}

async function getItem(collection: string, key: string) {
  const docRef = doc(db, collection, key)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) return docSnap.data()
  return null
}
