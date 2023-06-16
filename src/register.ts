import "dotenv/config"

import { REST, Routes } from "discord.js"
import fs from "node:fs"
import path, { join } from "node:path"
import { CommandFile } from "./types"

export const getCommands = () => {
  const commands: CommandFile[] = []

  for (const file of fs.readdirSync(join(__dirname, "commands"))) {
    const command = require(join(__dirname, "commands/", file)).default

    if ("data" in command && "execute" in command) {
      commands.push(command)
    } else {
      console.log(
        `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`
      )
    }
  }

  return commands
}

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
