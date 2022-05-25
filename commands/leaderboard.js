const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaders')
        .setDescription('Displays Leaderboard'),

    async execute(interaction) {



        const client = interaction.client
        const user = interaction.user
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id
        let leaderboard = await client.leveling.getTopUser(guildId)
        // console.log(leaderboard[0])
        const embed = new Discord.MessageEmbed()
            .setTitle('Haus of Decline Leaderboard')
            .setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        for (let i = 0; i < leaderboard.length; i++) {

            embed.addField(`${ i + 1 }: ${ leaderboard[i].username }`, `*Level:* ${ leaderboard[i].level } 
            *XP:* ${ leaderboard[i].xp } `)
        }
        await interaction.reply({ embeds: [embed] })
    }
}

