import { drizzle } from "drizzle-orm/planetscale-serverless"

export const connect = async (url?: string) => {
  const { connect: PlanetScaleConnect } = await eval(
    "import('@planetscale/database')"
  )

  const connection = PlanetScaleConnect({
    url,
  })

  const db = drizzle(connection)

  return db
}
