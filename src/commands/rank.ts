// import {
//   CommandInteraction,
//   EmbedBuilder,
//   GuildMember,
//   SlashCommandBuilder,
// } from "discord.js"
// import { CommandFile } from "../types"
// import { getOrCreate, userCollection, userDoc, userDocType } from "../utils/db"

// const RankCommand: CommandFile = {
//   data: new SlashCommandBuilder()
//     .setName("leaderboard")
//     .setDescription("See who's the greatest racist")
//     .toJSON(),
//   async execute(interaction, client) {
//     const snapshot = await userCollection.get()
//     const users = (
//       snapshot.docs
//         .filter((doc) => doc.exists)
//         .map((user) => ({ ...user.data(), id: user.id }))
//         .filter((user) => userDocType.safeParse(user).success) as userDoc[]
//     )
//       .sort((a, b) => a.KRN + a.N - (b.KRN + b.N))
//       .reverse()
//       .slice(0, 5)

//     const embed = new EmbedBuilder()
//       .setTitle("Hall of Racism")
//       .setColor(0x2a1f1c)
//       .setTimestamp(new Date())

//     for (const i in users) {
//       const user = users[i]
//       const discordUser = await client.users.fetch(user.id)
//       const counts = (user.KRN + user.N).toLocaleString()

//       embed.addFields({
//         name: `${parseInt(i) + 1}. ${discordUser.username}`,
//         value: `${counts} times`,
//         inline: false,
//       })
//     }

//     interaction.reply({ embeds: [embed] })
//   },
// }

// export default RankCommand
