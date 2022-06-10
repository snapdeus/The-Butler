const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('displays rank'),

    async execute(interaction) {
        const client = interaction.client
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id
        let rank = await client.leveling.getUserLevel(userId, guildId, username)
        const mongoUser = await User.findOne({ userId: userId })

        const winningPercentage = ((rank.dice_wins + (rank.dice_ties * 0.5)) / (rank.dice_ties + rank.dice_wins + rank.dice_losses)) * 100
        const scc_winningPercentage = ((mongoUser.scc_wins + (mongoUser.scc_ties * 0.5)) / (mongoUser.scc_ties + mongoUser.scc_wins + mongoUser.scc_losses)) * 100
        const embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`${ username } Stats`)
            .addField('Level: ', `${ rank.level }`)
            .addField('XP: ', `${ rank.xp }`)
            .addField('Haus Coins: ', `🪙 ${ rank.XPoverTime }`)
            .addField('Dice Winning Percentage', `${ winningPercentage.toFixed(2) }%`)
            .addField('ShipCapCrew Winning Percentage', `${ scc_winningPercentage.toFixed(2) }%`)
        if (rank.level === 1) {
            embed.addField('Total XP needed to level up:', `${ rank.nextLevel + 1 }`)
        } else {
            embed.addField('Total XP needed to level up:', `${ rank.nextLevel }`)
        }

        await interaction.reply({ embeds: [embed] })

        // message.channel.send(`<@${ user }> level: ${ rank.level }  xp: ${ rank.xp } xp to next level: ${ rank.nextLevel } `)


    }
}

