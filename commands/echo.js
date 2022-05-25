const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getString("input")
        console.log(interaction)
        const embed = new Discord.MessageEmbed({
            thumbnail: { url: 'https://i.imgur.com/hAnfQUZ.png' },
            title: 'description',
            type: 'rich',
        })
        await interaction.reply({ embeds: [embed] })
        console.log(input)
        console.log(interaction.client)
    }

}