import { config } from "dotenv"
import { migrate } from "drizzle-orm/planetscale-serverless/migrator"
import { connect } from "."

config()

const main = async () => {
  const db = await connect(process.env.DATABASE_URL)

  migrate(db, { migrationsFolder: "drizzle" }).then(() => {
    console.log("Migrated")
  })
}

main()
