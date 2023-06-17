import admin from "firebase-admin"
import { z } from "zod"

admin.initializeApp({
  credential: admin.credential.cert(require("../../account.json")),
})

export const userCollection = admin.firestore().collection("users")

export const userDocType = z.object({
  KRN: z.number(),
  N: z.number(),
  createdAt: z.number(),
  id: z.string(),
})

export type userDoc = z.infer<typeof userDocType>

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
