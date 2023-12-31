import {
  Client,
  CommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js"
import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless"

export type CommandFile = {
  execute: (
    interaction: CommandInteraction,
    client: Client<true>,
    db: PlanetScaleDatabase<Record<string, never>>
  ) => any
  data: RESTPostAPIChatInputApplicationCommandsJSONBody
}
