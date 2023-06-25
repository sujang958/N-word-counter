import { readdirSync } from "fs"
import { CommandFile } from "../types.js"
import { join } from "path"

export const getCommands = () => {
  const commands: CommandFile[] = []

  for (const file of readdirSync(join(__dirname, "../commands"))) {
    const command = require(join(__dirname, "../commands/", file))?.default

    if (!command) {
      console.log("[WARNING] Cannot register the file", file)
      continue
    }

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
