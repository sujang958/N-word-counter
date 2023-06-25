import { config } from "dotenv"
import { connect } from "./db"
import { userCollection } from "./utils/db"
import { users } from "./db/schema"

config()

const main = async () => {
  const db = await connect(process.env.DATABASE_URL)
  const fetchedUsers = await userCollection.get()
  const userDatas = fetchedUsers.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))

  const results = await Promise.allSettled(
    userDatas.map((userData: any) => {
      if (!("createdAt" in userData)) return
      const counts = BigInt(userData.KRN + userData.N)

      if (counts < 0n) return

      return db
        .insert(users)
        .values({
          counts,
          createdAt: new Date(userData.createdAt),
          discordId: userData.id,
        })
        .onDuplicateKeyUpdate({ set: { counts: counts } })
    })
  )

  console.log(results)
}

main()
