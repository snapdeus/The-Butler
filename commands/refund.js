const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('refund')
        .setDescription('Gives refund')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('The user to refund.')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('The amount to refund')
                .setRequired(true)),

    async execute(interaction) {
        const amount = interaction.options.getNumber("amount")
        const mentionable = interaction.options.getMentionable('user');
        console.log(mentionable)
        if (!interaction.memberPermissions.has("ADMINISTRATOR")) {
            return await interaction.reply("NO. **You can not use this command | Permission: ADMINISTRATOR**");
        }
        const client = interaction.client
        let userId = mentionable.id
        let username = mentionable.user.username
        let guildId = interaction.guild.id






        let rank = await client.leveling.getUserLevel(userId, guildId, username)


        client.leveling.addXPoverTime(userId, guildId, amount)

        rank = await client.leveling.getUserLevel(userId, guildId, username)

        const embed = new Discord.MessageEmbed()
            .setTitle('Administrator Refund')
            .addField('Username:', `**${ username }**`)
            .addField('Refund Amount:', `🪙 ${ amount }`)
            .addField('Refunded by', `**${ interaction.user.username }**`)
            .addField('New Total Balance: ', `🪙 ${ rank.XPoverTime }`)

        await interaction.reply({ embeds: [embed] })


    }
}