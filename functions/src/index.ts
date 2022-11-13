import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

exports.removeGuestUsers = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async () => {
    const db = admin.firestore()
    const usersCollection = db.collection('users')
    const querySnapshots = await usersCollection
      .where('isAnonymous', '==', true)
      .get()
    querySnapshots.forEach(async (doc) => {
      await usersCollection.doc(doc.id).delete()
    })
  })
