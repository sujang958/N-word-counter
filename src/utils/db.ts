import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless"
import { users } from "../db/schema"
import { eq } from "drizzle-orm"
import admin from "firebase-admin"

admin.initializeApp({
  credential: admin.credential.cert(require("../../account.json")),
})

export const userCollection = admin.firestore().collection("users")

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
