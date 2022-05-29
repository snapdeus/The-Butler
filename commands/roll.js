const events = require('../src/events/events')
const db = require('quick.db')
const Discord = require('discord.js')
const { SlashCommandBuilder, time } = require('@discordjs/builders');
const User = require('../models/user');
const Bag = require('../models/bag')
const { mongo } = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll Dice')
        .addNumberOption(option =>
            option.setName('wager')
                .setDescription('Optional amount to wager')),
    async execute(interaction) {
        let wager = Math.abs(interaction.options.getNumber("wager"))
        const client = interaction.client
        let player = interaction.user;
        let username = interaction.user.username
        let userId = interaction.user.id
        let guildId = interaction.guildId
        let channelId = interaction.channelId;
        let timestamp = interaction.createdTimestamp;
        const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
        const mongoUser = await User.findOne({ userId: userId })
        if (!mongoUser) {
            const user = new User({
                username: `${ username }`,
                userId: `${ userId }`,
                guildId: `${ guildId }`,
                xp: 1,
                xpOverTime: 1,
                timestamp: null,
                gameTimestamp: null,
                level: `${ 1 }`,
                nextLevel: `${ 9 }`
            })
            const bag = new Bag({
                user: `${ user._id }`,
            })
            await bag.save()
            user.bag = bag;
            await user.save()
            return await interaction.reply(`Wow, first message is a Gamble? Try again sport!`)
        }
        const lastMessage = mongoUser.gameTimestamp

        if (lastMessage !== null && client.leveling.diceCooldown - (Date.now() - lastMessage) > 0) {
            // console.log('cooldown active')
            client.leveling.emit(events.diceCooldownActive, channelId, userId)
            return
        }

        const { playerDiceRoll, botDiceRoll } = await client.leveling.rollDice(userId, guildId, username)




        let stakes;

        if (!wager) {
            stakes = parseInt(mongoUser.level * 5)
        } else if (mongoUser.xpOverTime < 0) {

            if (wager > mongoUser.xpOverTime) {
                wager = Math.abs(mongoUser.xpOverTime)

            }
            stakes = Math.abs(wager);
        } else {
            if (wager > mongoUser.xpOverTime) {
                wager = Math.abs(mongoUser.xpOverTime)
            }
            stakes = Math.abs(wager);
        }

        const xpStakes = mongoUser.level * 5
        await interaction.reply(`Let's begin. The stakes are: 🪙 ${ stakes } Haus coins ...rolling...`)


        if (playerDiceRoll > botDiceRoll) {


            let curLevelUp = mongoUser.nextLevel;

            //gain level and xp
            if (mongoUser.xp + xpStakes > curLevelUp) {
                // console.log('xp gain should level up')
                let difference = (mongoUser.xp + xpStakes) - curLevelUp
                mongoUser.level += 1;
                const nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)


                mongoUser.xp = difference;
                mongoUser.xpOverTime += stakes
                mongoUser.nextLevel = nextLevel
                // client.leveling.addOneLevel(userId, guildId, 1)
                // client.leveling.addXP(userId, guildId, difference)
                // client.leveling.addxpOverTime(userId, guildId, stakes)

                await mongoUser.save()

                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Winner! LEVEL UP!')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }.  ${ username } won 🪙 ${ stakes } Haus Coins and won ${ xpStakes } XP.`)
                    .addField('Level increased to: ', `${ mongoUser.level }`)
                    .addField('XP increased to: ', `${ mongoUser.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ mongoUser.xpOverTime }`)
                if (mongoUser.level === 1) {
                    embed.addField('Total XP needed to level up:', `${ mongoUser.nextLevel + 1 }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ mongoUser.nextLevel }`)
                }

                await interaction.followUp({ embeds: [embed] })

                //just gain xp
            } else {
                mongoUser.xp += xpStakes;
                mongoUser.xpOverTime += stakes


                // client.leveling.addXP(userId, guildId, xpStakes)
                // client.leveling.addxpOverTime(userId, guildId, stakes)
                await mongoUser.save()
                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Winner!')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }.  ${ username } won 🪙 ${ stakes } Haus Coins and won ${ xpStakes } XP.`)
                    .addField('Level remained the same: ', `${ mongoUser.level }`)
                    .addField('XP increased to: ', `${ mongoUser.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ mongoUser.xpOverTime }`)
                if (mongoUser.level === 1) {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp + 1 }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp }`)
                }

                await interaction.followUp({ embeds: [embed] })

            }


        } else if (playerDiceRoll < botDiceRoll) {



            let curLevelUp = mongoUser.nextLevel;
            //reset back to level 1 with 1 xp
            if (mongoUser.level === 1 && mongoUser.xp <= xpStakes) {

                mongoUser.xp = 0
                mongoUser.xpOverTime -= stakes
                // client.leveling.setXP(0, userId, guildId)
                // client.leveling.reducexpOverTime(userId, guildId, stakes)
                await mongoUser.save()
                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Sorry, you lost.')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }.  ${ username } lost 🪙 ${ stakes } Haus Coins and lost ${ xpStakes } XP.`)
                    .addField('Level remained the same: ', `${ mongoUser.level }`)
                    .addField('XP decreased to: ', `${ mongoUser.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ mongoUser.xpOverTime }`)
                if (mongoUser.level === 1) {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp + 1 }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp }`)
                }

                await interaction.followUp({ embeds: [embed] })

                return
            }

            //go down a level and lose xp
            if (mongoUser.xp < xpStakes) {
                let negativeNumber = mongoUser.xp - xpStakes;

                mongoUser.level -= 1;
                mongoUser.xpOverTime -= stakes
                const nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)

                mongoUser.nextLevel = nextLevel

                let total = nextLevel + negativeNumber;
                if (total === 0) {
                    total = 1;
                }

                mongoUser.xp = total
                await mongoUser.save()
                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Sorry, you lost. LEVEL LOST!')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }..  ${ username } lost 🪙 ${ stakes } Haus Coins and lost ${ xpStakes } XP.`)
                    .addField('Level decreased to: ', `${ mongoUser.level }`)
                    .addField('XP decreased to: ', `${ mongoUser.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ mongoUser.xpOverTime }`)
                if (mongoUser.level === 2) {
                    embed.addField('Total XP needed to level up:', `${ mongoUser.nextLevel }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ mongoUser.nextLevel }`)
                }

                await interaction.followUp({ embeds: [embed] })


                //lose level and xp
            } else if (mongoUser.xp === xpStakes && mongoUser.level !== 1) {
                mongoUser.level -= 1;
                mongoUser.xpOverTime -= stakes
                const nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
                mongoUser.nextLevel = nextLevel

                mongoUser.xp = nextLevel
                await mongoUser.save()
                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Sorry, you lost. LEVEL LOST!')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }..  ${ username } lost 🪙 ${ stakes } Haus Coins and lost ${ xpStakes } XP.`)
                    .addField('Level decreased to: ', `${ mongoUser.level }`)
                    .addField('XP decreased to: ', `${ mongoUser.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ mongoUser.xpOverTime }`)
                if (mongoUser.level === 2) {
                    embed.addField('Total XP needed to level up:', `${ mongoUser.nextLevel }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ mongoUser.nextLevel }`)
                }
                await interaction.followUp({ embeds: [embed] })
                //just lose xp
            } else {

                mongoUser.xp -= xpStakes
                mongoUser.xpOverTime -= stakes
                await mongoUser.save()
                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Sorry, you lost.')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }.  ${ username } lost 🪙 ${ stakes } Haus Coins and lost ${ xpStakes } XP.`)
                    .addField('Level remained the same: ', `${ mongoUser.level }`)
                    .addField('XP decreased to: ', `${ mongoUser.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ mongoUser.xpOverTime }`)
                if (mongoUser.level === 1) {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp + 1 }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp }`)
                }

                await interaction.followUp({ embeds: [embed] })


            }
            //tie
        } else {
            let curLevelUp = mongoUser.nextLevel

            const embed = new Discord.MessageEmbed()
                .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                .setTitle('TIE GAME')
                .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }.  `)
                .addField('Level remained the same: ', `${ mongoUser.level }`)
                .addField('XP remained the same: ', `${ mongoUser.xp }`)
                .addField('Haus Coins: ', `🪙 ${ mongoUser.xpOverTime }`)
            if (mongoUser.level === 1) {
                embed.addField('Total XP needed to level up:', `${ curLevelUp + 1 }`)
            } else {
                embed.addField('Total XP needed to level up:', `${ curLevelUp }`)
            }

            await interaction.followUp({ embeds: [embed] })

        }

        // new timestamp

        mongoUser.gameTimestamp = timestamp
        await mongoUser.save()

    }
}

