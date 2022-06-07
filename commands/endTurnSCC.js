const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');
const Bag = require('../models/bag')
const { MessageActionRow, MessageButton } = require('discord.js');
const { botScore } = require('../utils/score');
const events = require('../src/events/events')
const { v4: uuidv4 } = require('uuid');
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

        const mongoUser = await client.leveling.rollShipCC(userId, guildId, username)

        const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

        const rank = await client.leveling.getUserLevel(userId, guildId, username)

        const embed = new Discord.MessageEmbed()

        embed.setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        embed.setTitle(`GAMEOVER`)



        await interaction.message.channel.send({ embeds: [embed] })

        console.log('GAMEOVER')
    }
}