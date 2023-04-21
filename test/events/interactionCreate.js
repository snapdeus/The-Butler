const { Events } = require('discord.js');
const Discord = require('discord.js');
const path = require("path");

const fs = require('fs');
const User = require('../../models/user');

let config;

if (process.env.NODE_ENV?.trim() === 'development') {
    config = require('../config.test.json');
} else {
    config = require('../config.json');
}

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const client = interaction.client;
        if (interaction.isCommand()) {


            const commandsPath = path.resolve(__dirname, '../../commands');
            client.commands = new Discord.Collection();
            const commandFiles = fs.readdirSync(`${ commandsPath }`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`${ commandsPath }/${ file }`);
                // set a new item in the Collection
                // with the key as the command name and the value as the exported module
                client.commands.set(command.data.name, command);
            }

            if (interaction.channel.id !== config.XPCHANNEL && interaction.channel.id !== '968599620366250024') {
                return await interaction.reply('Please use this command in the Games channel');
            }
            if (interaction.commandName === 'double' || interaction.commandName === 'zzzbotscc' || interaction.commandName === 'zzzplayerrollscc' || interaction.commandName === 'zzzendscc') {
                return await interaction.reply('You do not have permission');
            }
            // if (interaction.commandName === 'shipcc') {
            //     return await interaction.reply('bug detected, game down temporarily')
            // }
            const command = client.commands.get(interaction.commandName);
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                // await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        } else if (interaction.isButton()) {


            if (interaction.customId.startsWith('Block')) {
                // const victimId = Array.from(interaction.message.mentions.users.values())[0].id
                if (!interaction.customId.endsWith(interaction.user.id)) {
                    return await interaction.reply({
                        content: "This button is not for you",
                        ephemeral: true
                    });
                }

            }
            if (interaction.customId.startsWith("Steal")) {
                if (!interaction.customId.endsWith(interaction.user.id)) {
                    return await interaction.reply({
                        content: "This button is not for you",
                        ephemeral: true
                    });
                }
            }

            if (!interaction.customId.endsWith(interaction.user.id)) {
                return await interaction.reply({
                    content: "This button is not for you",
                    ephemeral: true
                });
            }
            if (interaction.customId.startsWith('DICE_')) {
                const command = client.commands.get('double');
                const value = parseInt(interaction.message.embeds[0].fields[4].value);
                await command.execute(interaction, value);

            } else if (interaction.customId.startsWith('INITSCC_')) {

                const command = client.commands.get('zzzbotscc');
                await command.execute(interaction);
            } else if (interaction.customId.startsWith('PLAYSCC_')) {
                const userId = interaction.user.id;
                let mongoUser = await User.findOne({ userId: userId });
                mongoUser.is_playing_scc = false;
                await mongoUser.save();

                const command = client.commands.get('zzzplayerrollscc');
                await command.execute(interaction);

            } else if (interaction.customId.startsWith('ENDTURNSCC_')) {
                const userId = interaction.user.id;
                let mongoUser = await User.findOne({ userId: userId });
                mongoUser.is_playing_scc = false;
                await mongoUser.save();

                const command = client.commands.get('zzzendscc');
                await command.execute(interaction);
            }

        } else return;
    }
};