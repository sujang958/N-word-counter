import { EmbedBuilder, GuildMember, SlashCommandBuilder } from "discord.js"
import { CommandFile } from "../types"
import { selectOrInsert } from "../utils/db"

const StatsCommand: CommandFile = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("See your N-word stats")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("See other's N-word stats")
        .setRequired(false)
    )
    .toJSON(),
  async execute(interaction, client, db) {
    const targetUser =
      interaction.options.get("user", false)?.member ?? interaction.member

    if (!(targetUser instanceof GuildMember))
      return interaction.reply("Can't choose whose stats to show")

    const user = await selectOrInsert(db, targetUser.id)

    if (!user) return interaction.reply("Can't measure you!")

    const embed = new EmbedBuilder()
      .setColor(0x2a1f1c)
      .setTitle(`${targetUser.displayName}'s N-Word Stats`)
      .setDescription(
        `<@!${targetUser.id}> said the N word \`${Number(
          user.counts
        ).toLocaleString()}\` times`
      )
      .setFooter({
        text: `Recorded since ${new Date(user.createdAt).toDateString()}`,
      })

    interaction.reply({ embeds: [embed] })
  },
}

export default StatsCommand
