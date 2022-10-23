import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'

export const dbService = {
  addItem,
  getItem,
  subscribeToItem,
  getAllItems,
  updateItem,
}

async function addItem(item: unknown, fromCollection: string, key: string) {
  await setDoc(doc(db, fromCollection, key), item)
}

async function getItem(fromCollection: string, key: string) {
  const docRef = doc(db, fromCollection, key)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) return docSnap.data()
  return null
}

async function updateItem(
  fromCollection: string,
  key: string,
  updatedValue: Partial<unknown>
) {
  const itemRef = doc(db, fromCollection, key)
  await updateDoc(itemRef, updatedValue)
}

function subscribeToItem(
  fromCollection: string,
  key: string,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (parameters: any) => unknown
) {
  return onSnapshot(doc(db, fromCollection, key), (doc) => onChange(doc.data()))
}

async function getAllItems(fromCollection: string) {
  const items: unknown[] = []
  const querySnapshot = await getDocs(collection(db, fromCollection))
  querySnapshot.forEach((doc) =>
    items.push({
      id: doc.id,
      ...doc.data(),
    })
  )
  return items
}
