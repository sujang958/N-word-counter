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

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return

    const command = comamndCollection.get(interaction.commandName)

    if (!command) return

    command.execute(interaction, client, db)
  })

  client.login(process.env.BOT_TOKEN)
}

main()

process.on("uncaughtException", (error) => {
  console.log("Error", error)
})
