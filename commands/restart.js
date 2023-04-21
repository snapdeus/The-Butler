const Discord = require('discord.js')
const { exec } = require('child_process');
const { MessageActionRow, MessageButton } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restart The-Butler and HausBot if they crashed'),

    async execute(interaction) {

        let user = interaction.user
        const client = interaction.client;
        let guildId = interaction.guild.id;
        let userId = interaction.user.id;
        let userName = interaction.user.username;


        if (userId !== '584777613411614739') {
            return await interaction.reply({ content: `YOU DO NOT HAVE PERMISSION AND YOU ARE IN TROUBLE NOW >:[` })
        }

        exec('./reload_pm2.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${ error.message }`);
                return;
            }

            if (stderr) {
                console.error(`stderr: ${ stderr }`);
                return;
            }

            console.log(`stdout: ${ stdout }`);
        });

        return await interaction.reply({ content: `restarting bots...` })



    }
}