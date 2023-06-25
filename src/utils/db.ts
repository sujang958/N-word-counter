// import admin from "firebase-admin"
import { z } from "zod"

import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless"
import { User, users } from "../db/schema"
import { eq } from "drizzle-orm"

// admin.initializeApp({
//   credential: admin.credential.cert(require("../../account.json")),
// })

// export const userCollection = admin.firestore().collection("users")

// export const getOrCreate = async (id: string) => {
//   const userDocRef = userCollection.doc(id)
//   const userDoc = await userDocRef.get()
//   if (userDoc.exists) return userDocRef

//   await userDocRef.create({
//     KRN: 0,
//     N: 0,
//     createdAt: Date.now(),
//   })

//   return userDocRef
// }

export const selectOrInsert = async (
  db: PlanetScaleDatabase<Record<string, never>>,
  discordId: string
) => {
  const fetchedUsers = await db
    .select()
    .from(users)
    .where(eq(users.discordId, discordId))

  if (fetchedUsers.length > 0) return fetchedUsers[0]

  await db
    .insert(users)
    .values({ discordId, createdAt: new Date(), counts: 0n })

  const [createdUser] = await db
    .select()
    .from(users)
    .where(eq(users.discordId, discordId))

  return createdUser
}
