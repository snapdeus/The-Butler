
const { dairies } = require('../resources/dairy')
const Discord = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders');


const User = require('../models/user')
const Dairy = require('../models/dairy')
const Bag = require('../models/bag')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('dairy')
        .setDescription('purchase dairy'),

    async execute(interaction) {

        const client = interaction.client
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id

        const mongoUser = await User.findOne({ userId: userId })

        if (mongoUser.xpOverTime < 50) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Insufficient Funds")
                .addField('You do not have: ', ` 50 Haus Coin`)
                .addField(`Remaining Funds for ${ username }: `, `🪙 ${ mongoUser.xpOverTime } Haus Coin`)

            await interaction.reply({ embeds: [embed] })
            return
        }

        const allDairies = await Dairy.find()
        let dairy = allDairies[(Math.floor(Math.random() * allDairies.length))]

        await Bag.findOneAndUpdate({ user: mongoUser._id }, { $push: { dairy: dairy._id } })

        await User.findOneAndUpdate({ userId: userId }, { $inc: { xpOverTime: -50 } })





        const embed = new Discord.MessageEmbed()
            .setThumbnail(dairy.image)
            .setTitle(dairy.name)
            .setDescription(dairy.description)
            .addField('Origin: ', `${ dairy.origin }`)
            .addField('You have been debited: ', `🪙 50`)
            .addField(`Remaining Funds for ${ username }: `, `🪙 ${ mongoUser.xpOverTime - 50 } Haus Coin`)

        await interaction.reply({ embeds: [embed] })

    }
}

