import { EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { CommandFile } from "../types"
import { users } from "../db/schema"
import { desc } from "drizzle-orm"

const RankCommand: CommandFile = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("See who's the greatest racist")
    .toJSON(),
  async execute(interaction, client, db) {
    const fetchedUsers = await db
      .select()
      .from(users)
      .orderBy(desc(users.counts))
      .limit(10)

    const embed = new EmbedBuilder()
      .setTitle("Hall of Racism")
      .setColor(0x2a1f1c)
      .setTimestamp(new Date())

    for (const i in fetchedUsers) {
      const user = fetchedUsers[i]
      const discordUser = await client.users.fetch(user.discordId)
      const counts = user.counts.toLocaleString()

      embed.addFields({
        name: `${parseInt(i) + 1}. ${discordUser.username}`,
        value: `${counts} times`,
        inline: false,
      })
    }

    interaction.reply({ embeds: [embed] })
  },
}

export default RankCommand
