import {
  CommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js"

export type CommandFile = {
  execute: (interaction: CommandInteraction) => any
  data: RESTPostAPIChatInputApplicationCommandsJSONBody
}
