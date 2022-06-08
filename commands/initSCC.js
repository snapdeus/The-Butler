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
        .setDescription('begins game'),

    async execute(interaction) {
        const client = interaction.client
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id
        let rank = await client.leveling.getUserLevel(userId, guildId, username)


        const winningPercentage = ((rank.dice_wins + (rank.dice_ties * 0.5)) / (rank.dice_ties + rank.dice_wins + rank.dice_losses)) * 100

        const embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`${ username } Stats`)
            .addField('Level: ', `${ rank.level }`)

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()

                    .setLabel('Roll ')
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

