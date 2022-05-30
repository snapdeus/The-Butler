
const { pastas } = require('../resources/pasta')
const Discord = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders');


const User = require('../models/user')
const Pasta = require('../models/pasta')
const Bag = require('../models/bag')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('pasta')
        .setDescription('purchase pasta'),

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

        const allPastas = await Pasta.find()
        let pasta = allPastas[(Math.floor(Math.random() * allPastas.length))]

        await Bag.findOneAndUpdate({ user: mongoUser._id }, { $push: { pasta: pasta._id } })

        await User.findOneAndUpdate({ userId: userId }, { $inc: { xpOverTime: -75 } })





        const embed = new Discord.MessageEmbed()
            .setThumbnail(pasta.image)
            .setTitle(pasta.name)
            .setDescription(pasta.description)
            .addField('Origin: ', `${ pasta.origin }`)
            .addField('You have been debited: ', `🪙 75`)
            .addField(`Remaining Funds for ${ username }: `, `🪙 ${ mongoUser.xpOverTime - 75 } Haus Coin`)

        await interaction.reply({ embeds: [embed] })

    }
}

