import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'

export const dbService = { addItem, getItem, getAllItems, updateItem }

async function addItem(item: any, fromCollection: string, key: string) {
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
  updatedValue: any
) {
  const itemRef = doc(db, fromCollection, key)
  await updateDoc(itemRef, updatedValue)
}

async function getAllItems(fromCollection: string) {
  const items: any[] = []
  const querySnapshot = await getDocs(collection(db, fromCollection))
  querySnapshot.forEach((doc) =>
    items.push({
      id: doc.id,
      ...doc.data(),
    })
  )
  return items
}
