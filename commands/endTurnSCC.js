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
        .setName('endscc')
        .setDescription('Play Ship, Captain & Crew'),
    // .addNumberOption(option =>
    //     option.setName('wager')
    //         .setDescription('Play Ship, Captain, Crew')),
    async execute(interaction) {


        const client = interaction.client;
        let player = interaction.user;
        let username = interaction.user.username;
        let userId = interaction.user.id;
        let guildId = interaction.guildId;
        let channelId = interaction.channelId;
        let timestamp = interaction.createdTimestamp;

        const mongoUser = await User.findOne({ userId: userId })

        const xpStakes = mongoUser.level * 10;
        let curLevelUp = mongoUser.nextLevel;




        const embed = new Discord.MessageEmbed()

        embed.setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        embed.setTitle(`GAMEOVER`)
        embed.addField('Your score was: ', `${ mongoUser.my_cargo }`)
        embed.addField("The Butler's score was: ", `${ mongoUser.bot_cargo }`)
        if (mongoUser.my_cargo === mongoUser.bot_cargo) {
            embed.addField("TIE GAME", "Nothing lost nothing gained.\n Please play again.")
            mongoUser.scc_ties += 1;
        } else if (mongoUser.my_cargo > mongoUser.bot_cargo) {
            embed.addField("You win!", `You won 🪙 ${ mongoUser.my_scc_wager }!\n You gained ${ mongoUser.my_scc_wager } XP!`)
            mongoUser.scc_wins += 1;
            mongoUser.xpOverTime += mongoUser.my_scc_wager
            //gain level and xp
            if (mongoUser.xp + xpStakes > curLevelUp) {
                let difference = (mongoUser.xp + xpStakes) - curLevelUp
                mongoUser.level += 1;
                const nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
                mongoUser.xp = difference;
                mongoUser.nextLevel = nextLevel
                embed.addField("Level up!", `${ username } is now level ${ mongoUser.level }\nTotal XP is: ${ mongoUser.xp }`)
                //just gain xp
            } else {
                mongoUser.xp += xpStakes;
            }

            embed.addField("New total balance: ", `🪙 ${ mongoUser.xpOverTime }`)
        } else {
            embed.addField("You lost!", `You lost 🪙 ${ mongoUser.my_scc_wager }!\n You lost ${ mongoUser.my_scc_wager } XP!`)
            mongoUser.scc_losses += 1;
            mongoUser.xpOverTime -= mongoUser.my_scc_wager

            //reset back to level 1
            if (mongoUser.level === 1 && mongoUser.xp <= xpStakes) {

                mongoUser.xp = 0

                //lose level and xp
            } else if (mongoUser.xp < xpStakes) {
                let negativeNumber = mongoUser.xp - xpStakes;
                mongoUser.level -= 1;
                const nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
                mongoUser.nextLevel = nextLevel
                let total = nextLevel + negativeNumber;
                if (total === 0) {
                    total = 1;
                }
                mongoUser.xp = total
                embed.addField("Level lost!", `${ username } is now level ${ mongoUser.level }\nTotal XP is: ${ mongoUser.xp }`)
                //lose level and xp if not level 1
            } else if (mongoUser.xp === xpStakes && mongoUser.level !== 1) {
                mongoUser.level -= 1;
                const nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
                mongoUser.nextLevel = nextLevel
                mongoUser.xp = nextLevel
                embed.addField("Level lost!", `${ username } is now level ${ mongoUser.level }\nTotal XP is: ${ mongoUser.xp }`)

                //just lose xp
            } else {

                mongoUser.xp -= xpStakes
                embed.addField("Xp decreased:", `Total XP is: ${ mongoUser.xp }`)


                embed.addField("New total balance: ", `🪙 ${ mongoUser.xpOverTime }`)
            }
            await mongoUser.save()


            await interaction.message.channel.send({ embeds: [embed] })
        }
    }
}