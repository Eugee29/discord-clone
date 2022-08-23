import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase.config'

export const dbService = { addItem }

async function addItem(item: any, collection: string, key: string) {
  await setDoc(doc(db, collection, key), item)
}
