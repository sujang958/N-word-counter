import { Client, Collection, Events } from "discord.js"
import { config } from "dotenv"
import { CommandFile } from "./types"
// import { getOrCreate } from "./utils/db"
import { getCommands } from "./utils/commands"
import { connect } from "./db"
import onMessageCreate from "./events/MessageCreate"

config()

const commands = getCommands()
const comamndCollection = new Collection<string, CommandFile>()

for (const command of commands) {
  comamndCollection.set(command.data.name, command)
}

const client = new Client({
  intents: [130815],
})

client.on("ready", async (preparedClient) => {
  console.log("Logged in as", preparedClient.user.tag)
})

const main = async () => {
  const db = await connect(process.env.DATABASE_URL)

  client.on(Events.MessageCreate, async (message) => {
    onMessageCreate(message, db)
  })
client.on(Events.MessageCreate, async (message) => {
  const content = message.content
    .toLowerCase()
    .trim()
    .replace(/\u200b/gi, "")

  if (!message.member?.id) return

  const userRef = await getOrCreate(message.member.id)

  const NCounts = (
    content.match(/nigger|nigga|n1gga|n1gger|n1gg3r|nigg3r|nigg@|n1gg@/gi) || []
  ).length
  const KRNCounts = (content.match(/니가|니거|닉아|닉가/gi) || [])
    .length

  const doc = (await userRef.get()).data()
  if (!doc) return

  userRef.update({ KRN: doc.KRN + KRNCounts, N: doc.N + NCounts })
})

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return

    const command = comamndCollection.get(interaction.commandName)

    if (!command) return

  command.execute(interaction, client)
})

  client.login(process.env.BOT_TOKEN)
}

main()

process.on("uncaughtException", (error) => {
  console.log("Error", error)
})
