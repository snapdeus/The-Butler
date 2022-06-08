const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');
const Bag = require('../models/bag')
const { MessageActionRow, MessageButton } = require('discord.js');
const { botScore } = require('../utils/score');
const events = require('../src/events/events')
const { v4: uuidv4 } = require('uuid');
const { mongo } = require('mongoose');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('endscc')
        .setDescription('Play Ship, Captain & Crew'),
    // .addNumberOption(option =>
    //     option.setName('wager')
    //         .setDescription('Play Ship, Captain, Crew')),
    async execute(interaction) {


        const client = interaction.client;
        let player = interaction.user;
        let username = interaction.user.username;
        let userId = interaction.user.id;
        let guildId = interaction.guildId;
        let channelId = interaction.channelId;
        let timestamp = interaction.createdTimestamp;

        const mongoUser = await User.findOne({ userId: userId })

        const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']


        const embed = new Discord.MessageEmbed()

        embed.setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        embed.setTitle(`GAMEOVER`)
        embed.addField('Your score was: ', `${ mongoUser.my_cargo }`)
        embed.addField("The Butler's score was: ", `${ mongoUser.bot_cargo }`)
        if (mongoUser.my_cargo === mongoUser.bot_cargo) {
            embed.addField("TIE GAME", "nothing lost nothing gained\n please play again")
            mongoUser.scc_ties += 1;
        } else if (mongoUser.my_cargo > mongoUser.bot_cargo) {
            embed.addField("You win!", `You won 🪙 ${ mongoUser.my_scc_wager }!`)
            mongoUser.xpOverTime += mongoUser.my_scc_wager
            embed.addField("New total balance: ", `${ mongoUser.xpOverTime + mongoUser.my_scc_wager }`)
        } else {
            embed.addField("You lost!", `You lost 🪙 ${ mongoUser.my_scc_wager }!`)
            mongoUser.xpOverTime -= mongoUser.my_scc_wager
            embed.addField("New total balance: ", `${ mongoUser.xpOverTime - mongoUser.my_scc_wager }`)
        }
        await mongoUser.save()


        await interaction.message.channel.send({ embeds: [embed] })

        console.log('GAMEOVER')
    }
}