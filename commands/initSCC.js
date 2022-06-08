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

        if (!wager) {
            wager = parseInt(mongoUser.level * 10)
        }

        mongoUser.my_scc_wager = parseInt(wager)
        await mongoUser.save()
        const embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`Ship Captain Crew`)
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
        await interaction.reply({ embeds: [embed], components: [row], })
        setTimeout(function () {
            row.components[0].setDisabled(true);
            interaction.editReply({ components: [row] });
        }, 60000);

    }
}

