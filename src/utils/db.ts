import admin from "firebase-admin"

admin.initializeApp({
  credential: admin.credential.cert(require("../../account.json")),
})

export const userCollection = admin.firestore().collection("users")

export const getOrCreate = async (id: string) => {
  const userDocRef = userCollection.doc(id)
  const userDoc = await userDocRef.get()
  if (userDoc.exists) return userDocRef

  await userDocRef.create({
    KRN: 0,
    N: 0,
    createdAt: Date.now(),
  })

  return userDocRef
}
