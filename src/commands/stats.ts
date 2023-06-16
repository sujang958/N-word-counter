import {
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js"
import { CommandFile } from "../types"
import { getOrCreate } from "../utils/db"

const StatsCommand: CommandFile = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("See your N-word stats")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("See other's N-word stats")
        .setRequired(false)
    ).toJSON(),
  async execute(interaction: CommandInteraction) {
    const targetUser =
      interaction.options.get("user", false) ?? interaction.member

    if (!(targetUser instanceof GuildMember))
      return interaction.reply("Can't choose whose stats to show")

    const user = await getOrCreate(targetUser.id)
    const userData = (await user.get()).data()

    if (!userData) return interaction.reply("Can't measure you!")

    const embed = new EmbedBuilder()
      .setColor(0x1111ee)
      .setTitle(`${interaction.member?.user.username}'s N-Word Stats`)
      .setDescription(
        `${interaction.member?.user.username} said the N word ${
          userData.KRN + userData.N
        } times`
      )
      .setFooter({
        text: `Recorded since ${new Date(userData.createdAt).toDateString()}`,
      })

    interaction.reply({ embeds: [embed] })
  },
}

export default StatsCommand
