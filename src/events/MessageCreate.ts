import { Message } from "discord.js"
import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless"
import { selectOrInsert } from "../utils/db"
import { users } from "../db/schema"
import { eq } from "drizzle-orm"

const onMessageCreate = async (
  message: Message,
  db: PlanetScaleDatabase<Record<string, never>>
) => {
  const content = message.content
    .toLowerCase()
    .trim()
    .replace(/\u200b/gi, "")

  if (!message.member?.id) return

  db.select()

  const user = await selectOrInsert(db, message.member.id)

  if (!user) return

  const NCounts = (
    content.match(
      /nigger|nigga|n1gga|n1gger|n1gg3r|nigg3r|nigg@|n1gg@|니가|니거|닉아|닉가|닉어|닉거/gi
    ) || []
  ).length

  await db
    .update(users)
    .set({ counts: user.counts + BigInt(NCounts) })
    .where(eq(users.id, user.id))
}

export default onMessageCreate
