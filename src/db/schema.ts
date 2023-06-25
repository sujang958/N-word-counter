import {
  mysqlTable,
  serial,
  date,
  varchar,
  customType,
  uniqueIndex,
} from "drizzle-orm/mysql-core"
import type { InferModel } from "drizzle-orm"

const bigintUnsiged = customType<{
  data: bigint
  driverData: string
}>({
  dataType(_) {
    return "bigint unsigned"
  },
  fromDriver(value: string) {
    return BigInt(value)
  },
})

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    discordId: varchar("discordId", { length: 512 }).notNull(),
    counts: bigintUnsiged("counts").notNull(),
    createdAt: date("createdAt").notNull(),
  },
  (table) => ({ discordIdIdx: uniqueIndex("discordIdIdx").on(table.discordId) })
)

export type User = InferModel<typeof users>
