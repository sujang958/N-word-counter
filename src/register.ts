import "dotenv/config"

import { REST, Routes } from "discord.js"
import { getCommands } from "./utils/commands"

const commands = getCommands()

const rest = new REST().setToken(process.env.BOT_TOKEN ?? "")

;(async () => {
  try {
    await rest.put(Routes.applicationCommands("1118903489423228998"), {
      body: commands.map((command) => command.data),
    })

    console.log(`Successfully reloaded.`)
  } catch (error) {
    console.error(error)
  }
})()
