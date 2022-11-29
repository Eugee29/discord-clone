import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

export const cloudService = { uploadAvatar }

async function uploadAvatar(imageFile: File) {
  try {
    const storage = getStorage()
    const storageRef = ref(storage, `avatars/${imageFile.name} - ${uuidv4()}`)
    await uploadBytes(storageRef, imageFile)
    return await getDownloadURL(storageRef)
  } catch (err) {
    console.error(err)
    throw err
  }
}
