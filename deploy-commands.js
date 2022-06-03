const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { TESTCLIENTID, TESTGUILDID, TESTTOKEN } = require('./test/config.json');

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


const rest = new REST({ version: '9' }).setToken(TESTTOKEN);

rest.put(Routes.applicationGuildCommands(TESTCLIENTID, TESTGUILDID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
