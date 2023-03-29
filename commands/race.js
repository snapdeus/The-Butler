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
        .setName('race')
        .setDescription('begins game'),

    async execute(interaction) {
        let wager = Math.abs(interaction.options.getNumber("wager"))

        const client = interaction.client
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id
        let mongoUser = await User.findOne({ userId: userId })
        if (!mongoUser) {
            const user = new User({
                username: `${ username }`,
                userId: `${ userId }`,
                guildId: `${ guildId }`,
                xp: 1,
                xpOverTime: 1,
                timestamp: null,
                gameTimestamp: null,
                dice_wins: 0,
                dice_losses: 0,
                dice_ties: 0,
                level: `${ 1 }`,
                nextLevel: `${ 9 }`,
                race_wins: 0,
                race_losses: 0,
                race_wager: 0,
                is_playing_race: false
            })
            const bag = new Bag({
                user: `${ user._id }`,
            })
            await bag.save()
            user.bag = bag;
            await user.save()
            return await interaction.reply(`Wow, first message is a Gamble? The Database needs to recognize you first. Try again.`)
        }

        if (mongoUser.race_wins === undefined) {
            mongoUser.is_playing_race = true;
            mongoUser.race_wins = 0;
            mongoUser.race_losses = 0;
            mongoUser.race_wager = 0;
        }

        let currentGold = Math.abs(mongoUser.xpOverTime)



        mongoUser.is_playing_race = true;
        // console.log(mongoUser)

        await mongoUser.save()
        const embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`Racing Game`)


        await interaction.reply({ embeds: [embed] })


    }
}

