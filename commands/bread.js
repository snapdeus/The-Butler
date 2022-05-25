
const { breads } = require('../resources/breads')
const Discord = require('discord.js')
const db = require('quick.db')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bread')
        .setDescription('purchase bread'),

    async execute(interaction) {

        const client = interaction.client
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id

        let rank = await client.leveling.getUserLevel(userId, guildId, username)


        const bag = new db.table('bag')

        const dbHasBag = bag.has(`${ userId }`)
        if (!dbHasBag) {
            bag.set(`${ userId }.bread`, [])

        }


        if (rank.XPoverTime < 35) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Insufficient Funds")
                .addField('You do not have: ', `🪙 35 Haus Coin`)
                .addField(`Remaining Funds for ${ username }: `, `🪙 ${ rank.XPoverTime } Haus Coin`)

            await interaction.reply({ embeds: [embed] })
            return
        }

        let bread = breads[(Math.floor(Math.random() * breads.length))]

        bag.push(`${ userId }.bread`, bread.breadId)




        client.leveling.reduceXPoverTime(userId, guildId, 35)

        rank = await client.leveling.getUserLevel(userId, guildId, username)

        const embed = new Discord.MessageEmbed()
            .setThumbnail(bread.Image)
            .setTitle(bread.Name)
            .setDescription(bread.Description)
            .addField('Type: ', `${ bread.Type }`)
            .addField('Origin: ', `${ bread.Origin }`)
            .addField('You have been debited: ', `🪙 35`)
            .addField(`Remaining Funds for ${ username }: `, `🪙 ${ rank.XPoverTime } Haus Coin`)

        await interaction.reply({ embeds: [embed] })

    }
}

