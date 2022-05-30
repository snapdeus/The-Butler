
const { breads } = require('../resources/breads')
const Discord = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user')
const Bread = require('../models/bread')
const Bag = require('../models/bag')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bread')
        .setDescription('purchase bread'),

    async execute(interaction) {

        const client = interaction.client
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id


        const mongoUser = await User.findOne({ userId: userId })

        if (mongoUser.xpOverTime < 35) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Insufficient Funds")
                .addField('You do not have: ', `🪙 35 Haus Coin`)
                .addField(`Remaining Funds for ${ username }: `, `🪙 ${ mongoUser.xpOverTime } Haus Coin`)

            await interaction.reply({ embeds: [embed] })
            return
        }
        const allBreads = await Bread.find()
        let bread = allBreads[(Math.floor(Math.random() * allBreads.length))]


        await Bag.findOneAndUpdate({ user: mongoUser._id }, { $push: { bread: bread._id } })

        await User.findOneAndUpdate({ userId: userId }, { $inc: { xpOverTime: -35 } })


        const embed = new Discord.MessageEmbed()
            .setThumbnail(bread.image)
            .setTitle(bread.name)
            .setDescription(bread.description)
            .addField('Type: ', `${ bread.type }`)
            .addField('Origin: ', `${ bread.origin }`)
            .addField('You have been debited: ', `🪙 35`)
            .addField(`Remaining Funds for ${ username }: `, `🪙 ${ mongoUser.xpOverTime - 35 } Haus Coin`)

        await interaction.reply({ embeds: [embed] })

    }
}

