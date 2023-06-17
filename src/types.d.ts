import {
  Client,
  CommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js"

export type CommandFile = {
  execute: (interaction: CommandInteraction, client: Client<true>) => any
  data: RESTPostAPIChatInputApplicationCommandsJSONBody
}
