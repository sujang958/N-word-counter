import {
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js"
import { CommandFile } from "../types"
import { getOrCreate } from "../utils/db"

// const StatsCommand: CommandFile = {
//   data: new SlashCommandBuilder()
//     .setName("stats")
//     .setDescription("See your N-word stats")
//     .addUserOption((option) =>
//       option
//         .setName("user")
//         .setDescription("See other's N-word stats")
//         .setRequired(false)
//     )
//     .toJSON(),
//   async execute(interaction, _) {
//     const targetUser =
//       interaction.options.get("user", false)?.member ?? interaction.member

    if (!(targetUser instanceof GuildMember))
      return interaction.reply("Can't choose whose stats to show")

    const user = await getOrCreate(targetUser.id)
    const userData = (await user.get()).data()

    if (!userData) return interaction.reply("Can't measure you!")

    const embed = new EmbedBuilder()
      .setColor(0x2a1f1c)
      .setTitle(`${targetUser.displayName}'s N-Word Stats`)
      .setDescription(
        `<@!${targetUser.id}> said the N word \`${Number(
          userData.KRN + userData.N
        ).toLocaleString()}\` times`
      )
      .setFooter({
        text: `Recorded since ${new Date(userData.createdAt).toDateString()}`,
      })

    interaction.reply({ embeds: [embed] })
  },
}

export default StatsCommand
