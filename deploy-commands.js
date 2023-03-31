const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
let config;

if (process.env.NODE_ENV?.trim() === 'development') {
    config = require('./test/config.test.json');
} else {
    config = require('./test/config.json');
}


const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, './commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}


const rest = new REST({ version: '9' }).setToken(config.TOKEN);

rest.put(Routes.applicationGuildCommands(config.CLIENTID, config.GUILDID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
