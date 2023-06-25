import { Client, Collection, Interaction } from "discord.js"
import { CommandFile } from "../types"
import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless"

const onInteractionCreate = async (
  interaction: Interaction,
  comamndCollection: Collection<string, CommandFile>,
  ...args: [Client<true>, PlanetScaleDatabase<Record<string, never>>]
) => {
  if (!interaction.isCommand()) return

  const command = comamndCollection.get(interaction.commandName)

  if (!command) return

  command.execute(interaction, ...args)
}

export default onInteractionCreate
