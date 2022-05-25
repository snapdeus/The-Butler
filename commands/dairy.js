
const { dairy } = require('../resources/dairy')
const Discord = require('discord.js')
const db = require('quick.db')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dairy')
        .setDescription('purchase dairy'),

    async execute(interaction) {

        const client = interaction.client
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id
        let rank = await client.leveling.getUserLevel(userId, guildId, username)


        const bag = new db.table('bag')

        const dbHasBag = bag.has(`${ userId }`)
        if (!dbHasBag) {
            bag.set(`${ userId }.dairy`, [])

        }



        if (rank.XPoverTime < 50) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Insufficient Funds")
                .addField('You do not have: ', ` 50 Haus Coin`)
                .addField(`Remaining Funds for ${ username }: `, `🪙 ${ rank.XPoverTime } Haus Coin`)

            await interaction.reply({ embeds: [embed] })
            return
        }

        let dairyItem = dairy[(Math.floor(Math.random() * dairy.length))]

        bag.push(`${ userId }.dairy`, dairyItem.dairyId)




        client.leveling.reduceXPoverTime(userId, guildId, 50)

        rank = await client.leveling.getUserLevel(userId, guildId, username)

        const embed = new Discord.MessageEmbed()
            .setThumbnail(dairyItem.Image)
            .setTitle(dairyItem.Name)
            .setDescription(dairyItem.Description)
            .addField('Origin: ', `${ dairyItem.Origin }`)
            .addField('You have been debited: ', `🪙 50`)
            .addField(`Remaining Funds for ${ username }: `, `🪙 ${ rank.XPoverTime } Haus Coin`)

        await interaction.reply({ embeds: [embed] })

    }
}

