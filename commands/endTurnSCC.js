const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');
const Bag = require('../models/bag')
const { MessageActionRow, MessageButton } = require('discord.js');
const { botScore } = require('../utils/score');
const events = require('../src/events')
const { v4: uuidv4 } = require('uuid');
const { mongo } = require('mongoose');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('zzzendscc')
        .setDescription('Not a usable command'),

    async execute(interaction) {


        const client = interaction.client;
        let player = interaction.user;
        let username = interaction.user.username;
        let userId = interaction.user.id;
        let guildId = interaction.guildId;
        let channelId = interaction.channelId;
        let timestamp = interaction.createdTimestamp;

        const mongoUser = await User.findOne({ userId: userId })

        // console.log(mongoUser)
        const xpStakes = mongoUser.level * 10;
        let curLevelUp = mongoUser.nextLevel;




        const embed = new Discord.MessageEmbed()

        embed.setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))



        if (mongoUser.my_cargo === mongoUser.bot_cargo) {
            embed.setTitle(`${ username } TIED!`)
            embed.addField('The score was: ', `${ mongoUser.my_cargo } - ${ mongoUser.bot_cargo }`)
            embed.addField("TIE GAME", "Nothing lost nothing gained.\n Please play again.")
            mongoUser.scc_ties += 1;
        } else if (mongoUser.my_cargo > mongoUser.bot_cargo) {
            embed.setTitle(`${ username } WON!`)
            embed.addField('The score was: ', `${ mongoUser.my_cargo } - ${ mongoUser.bot_cargo }`)

            mongoUser.scc_wins += 1;
            mongoUser.xpOverTime += mongoUser.my_scc_wager
            //gain level and xp
            if (mongoUser.xp + xpStakes > curLevelUp) {
                let difference = (mongoUser.xp + xpStakes) - curLevelUp
                mongoUser.level += 1;
                const nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
                mongoUser.xp = difference;
                mongoUser.nextLevel = nextLevel
                embed.addField("Congratulations!", `You won 🪙 ${ mongoUser.my_scc_wager }!\n You gained ${ xpStakes } XP!\n---\n${ username } is now\nLevel: ${ mongoUser.level }\n XP: ${ mongoUser.xp }`)
                embed.addField("Level up!", `↗️↗️↗️`)
                //just gain xp
            } else {
                mongoUser.xp += xpStakes;
                embed.addField("Good job!", `You won 🪙 ${ mongoUser.my_scc_wager }!\n You gained ${ xpStakes } XP!\n---\n${ username } is\nLevel: ${ mongoUser.level }\n XP: ${ mongoUser.xp }`)
            }

            embed.addField("New total balance: ", `🪙 ${ mongoUser.xpOverTime }`)
        } else {
            embed.setTitle(`${ username } LOST!`)
            embed.addField('The score was: ', `${ mongoUser.my_cargo } - ${ mongoUser.bot_cargo }`)

            mongoUser.scc_losses += 1;
            mongoUser.xpOverTime -= mongoUser.my_scc_wager

            //reset back to level 1
            if (mongoUser.level === 1 && mongoUser.xp <= xpStakes) {

                mongoUser.xp = 0
                embed.addField("Sorry, but...", `You lost 🪙 ${ mongoUser.my_scc_wager }!\n You lost ${ xpStakes } XP!\n---\n${ username } is\nLevel: ${ mongoUser.level } XP: ${ mongoUser.xp }`)
                embed.addField("New total balance: ", `🪙 ${ mongoUser.xpOverTime }`)
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
                embed.addField("Our Condolences...", `You lost 🪙 ${ mongoUser.my_scc_wager }!\n You lost ${ xpStakes } XP!\n---\n${ username } is now\nLevel: ${ mongoUser.level }\nXP: ${ mongoUser.xp }`)
                embed.addField("Level lost!", `↘️↘️↘️`)
                //lose level and xp if not level 1
            } else if (mongoUser.xp === xpStakes && mongoUser.level !== 1) {
                mongoUser.level -= 1;
                const nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
                mongoUser.nextLevel = nextLevel
                mongoUser.xp = nextLevel
                embed.addField("Our Condolences...", `You lost 🪙 ${ mongoUser.my_scc_wager }!\n You lost ${ xpStakes } XP!\n---\n${ username } is now\nLevel: ${ mongoUser.level }\nxP: ${ mongoUser.xp }`)
                embed.addField("Level lost!", `↘️↘️↘️`)

                //just lose xp
            } else {

                mongoUser.xp -= xpStakes

                embed.addField("Sorry, but...", `You lost 🪙 ${ mongoUser.my_scc_wager }!\n You lost ${ xpStakes } XP!\n---\n${ username } is\nLevel: ${ mongoUser.level } XP: ${ mongoUser.xp }`)
                embed.addField("New total balance: ", `🪙 ${ mongoUser.xpOverTime }`)

            }
        }
        await mongoUser.save()
        await interaction.message.channel.send({ embeds: [embed] })
    }
}