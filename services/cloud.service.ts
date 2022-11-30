import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

export const cloudService = { uploadFile }

async function uploadFile(destination: string, file: File) {
  try {
    const storage = getStorage()
    const storageRef = ref(storage, `${destination}/${file.name} - ${uuidv4()}`)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  } catch (err) {
    console.error(err)
    throw err
  }
}
