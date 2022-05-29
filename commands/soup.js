
const { soups } = require('../resources/soups')
const Discord = require('discord.js')
const db = require('quick.db')
const { SlashCommandBuilder } = require('@discordjs/builders');


const User = require('../models/user')
const Soup = require('../models/soup')
const Bag = require('../models/bag')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('soup')
        .setDescription('purchase soup'),

    async execute(interaction) {

        const client = interaction.client
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id

        const mongoUser = await User.findOne({ userId: userId })

        if (mongoUser.xpOverTime < 75) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Insufficient Funds")
                .addField('You do not have: ', ` 75 Haus Coin`)
                .addField(`Remaining Funds for ${ username }: `, `🪙 ${ mongoUser.xpOverTime } Haus Coin`)

            await interaction.reply({ embeds: [embed] })
            return
        }

        const allSoups = await Soup.find()
        let soup = allSoups[(Math.floor(Math.random() * allSoups.length))]

        await Bag.findOneAndUpdate({ user: mongoUser._id }, { $push: { soup: soup._id } })

        await User.findOneAndUpdate({ userId: userId }, { $inc: { xpOverTime: -75 } })





        const embed = new Discord.MessageEmbed()
            .setThumbnail(soup.image)
            .setTitle(soup.name)
            .setDescription(soup.description)
            .addField('Origin: ', `${ soup.origin }`)
            .addField('You have been debited: ', `🪙 75`)
            .addField(`Remaining Funds for ${ username }: `, `🪙 ${ mongoUser.xpOverTime - 75 } Haus Coin`)

        await interaction.reply({ embeds: [embed] })

    }
}

