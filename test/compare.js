require('dotenv').config();

const { Client: DiscordClient, Intents } = require('discord.js');
const client = new DiscordClient({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});


const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/butler-db?authSource=butler-db`, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PW,
    autoIndex: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});



const { EasyLeveling } = require('../index.js');
const config = require('./config.json');
const options = {
    startingXP: 0,
    startingLevel: 1,
    levelUpXP: 9,
    database: 'sqlite',
    cooldown: 100,
    diceCooldown: 100,
};

const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');





const commands = []
const commandsPath = path.resolve(__dirname, '../commands');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`${ commandsPath }`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`${ commandsPath }/${ file }`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}


client.leveling = new EasyLeveling(client, options);
client.on('ready', () => {
    console.log(client.user.tag + ' is ready!');

})
    .on('interactionCreate', async (interaction, message) => {
        if (interaction.isCommand()) {

            if (interaction.channel.id !== config.XPCHANNEL) {
                return await interaction.reply('Please use this command in the Games channel')
            }
            if (interaction.commandName === 'double') {
                return await interaction.reply('Use roll instead ;]')
            }
            const command = client.commands.get(interaction.commandName)
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        } else if (interaction.isButton()) {

            if (!interaction.customId.endsWith(interaction.user.id)) {

                return interaction.reply({
                    content: "This button is not for you",
                    ephemeral: true
                })
            }


            const command = client.commands.get('double')
            const value = parseInt(interaction.message.embeds[0].fields[4].value)
            await command.execute(interaction, value)

        } else return
    })
    .on('messageCreate', (message) => {
        if (message.author.bot) return;

        if (message.content === '!bag' || message.content === '!bread' || message.content === '!dairy' ||
            message.content === '!leaders' || message.content === '!pasta' || message.content === '!rank' || message.content === '!roll' || message.content === '!soup') {
            return message.reply('Now using slash commands for games and XP. No more "!" for commands: bag, bread, dairy, soup, pasta, leaders, rank, roll ')
        }
        // command handler (set prefix in config.json)
        client.leveling.addLevels(message.author.id, message.guild.id, message.channel.id, message.createdTimestamp, message.author.username, message.author);
    });


client.leveling.on('UserLevelUp', (newLevel, lastLevel, userId, guildId, channelId, username, author) => {
    const embed = new Discord.MessageEmbed()
        .setThumbnail(author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTitle('LEVEL UP!')
        .setDescription(`Congrats <@${ userId }>! You have advanced to level ${ newLevel }. Your old level was level ${ lastLevel }`)
        .setColor('RED');
    client.channels.cache.get(config.XPCHANNEL).send({ embeds: [embed] });
});
client.leveling.on('cooldownActive', (channelId, userId) => {
    client.channels.cache.get(config.XPCHANNEL).send(`Cooldown is still active, <@${ userId }>.  You'll get more 🪙 in ${ options.cooldown / 1000 } seconds.`);
});
client.leveling.on('diceCooldownActive', (channelId, userId) => {
    client.channels.cache.get(config.XPCHANNEL).send(`Cooldown is still active, <@${ userId }>.  Roll again in ${ options.diceCooldown / 1000 } seconds.`);
});
client.leveling.on('error', (e, functionName) => {
    console.log(`An error occured at the function ${ functionName }. The error is as follows`);
    console.log(e);
});
client.login(config.TOKEN);