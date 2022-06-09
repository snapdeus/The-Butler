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
        .setName('shipcc')
        .setDescription('begins game')
        .addNumberOption(option =>
            option.setName('wager')
                .setDescription('Optional amount to wager')),
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
                my_cargo: 0,
                bot_cargo: 0,
                my_scc_wager: 0,
                scc_wins: 0,
                scc_losses: 0,
                scc_ties: 0,
            })
            const bag = new Bag({
                user: `${ user._id }`,
            })
            await bag.save()
            user.bag = bag;
            await user.save()
            return await interaction.reply(`Wow, first message is a Gamble? Try again sport!`)
        }

        if (mongoUser.my_cargo === undefined) {
            mongoUser.my_cargo = 0;
            mongoUser.bot_cargo = 0;
            mongoUser.my_scc_wager = 0;
            mongoUser.scc_wins = 0;
            mongoUser.scc_losses = 0;
            mongoUser.scc_ties = 0;

        }

        if (!wager) {
            wager = parseInt(mongoUser.level * 10)
        }

        mongoUser.my_scc_wager = parseInt(wager)
        await mongoUser.save()
        const embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`Ship Captain Crew`)
            .addField('Rules: ', "Please read the rules here: https://www.dicegamedepot.com/ship-captain-and-crew-dice-game-rules/")
            .setDescription('Wagering Stage')
            .addField(`Your current Gold is 🪙 ${ mongoUser.xpOverTime }`, 'You may select a wager when you\n issue the command, /shipcc + optional wager.\nThe default wager is your level x 10.')
            .addField("You have wagered:", `🪙 ${ wager }`)
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()

                    .setLabel('Play')
                    .setStyle('PRIMARY')
                    .setCustomId(`INITSCC_` + uuidv4() + interaction.user.id)

            );
        const filter = async i => i.customId.endsWith(interaction.user.id)
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {

            if (i.user.id === userId) {

                ///put edit the embed message her
                row.components[0].setDisabled(true)
                interaction.editReply({ components: [row] });
            }
        });
        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
        setTimeout(function () {
            row.components[0].setDisabled(true);
            interaction.editReply({ components: [row] });
        }, 120000);

    }
}

