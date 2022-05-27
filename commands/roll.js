const events = require('../src/events/events')
const db = require('quick.db')
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll Dice')
        .addNumberOption(option =>
            option.setName('wager')
                .setDescription('Optional amount to wager')),
    async execute(interaction) {
        let wager = interaction.options.getNumber("wager")
        const client = interaction.client
        let player = interaction.user;
        let username = interaction.user.username
        let userId = interaction.user.id
        let guildId = interaction.guildId
        let channelId = interaction.channelId;
        let timestamp = interaction.createdTimestamp;
        const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
        const lastMessage = await db.get(`${ userId }-${ guildId }.timestamp`);

        if (lastMessage !== null && client.leveling.diceCooldown - (Date.now() - lastMessage) > 0) {
            // console.log('cooldown active')
            client.leveling.emit(events.diceCooldownActive, channelId, userId)
            return
        }

        const { playerDiceRoll, botDiceRoll } = await client.leveling.rollDice(userId, guildId, username)

        const userStats = await client.leveling.getUserLevel(userId, guildId);


        let stakes;
        if (!wager) {
            stakes = userStats.level * 5
        } else {
            if (wager > userStats.XPoverTime) {
                wager = userStats.XPoverTime
            }
            stakes = wager;
        }

        const xpStakes = userStats.level * 5
        await interaction.reply(`Let's begin. The stakes are: 🪙 ${ stakes } Haus coins ...rolling...`)


        if (playerDiceRoll > botDiceRoll) {

            let rank = await client.leveling.getUserLevel(userId, guildId)
            let curLevelUp = await db.get(`${ userId }-${ guildId }.nextLevel`)

            //gain level and xp
            if (rank.xp + xpStakes > curLevelUp) {
                // console.log('xp gain should level up')
                let difference = (rank.xp + xpStakes) - curLevelUp
                client.leveling.addOneLevel(userId, guildId, 1)
                client.leveling.addXP(userId, guildId, difference)
                client.leveling.addXPoverTime(userId, guildId, stakes)

                rank = await client.leveling.getUserLevel(userId, guildId)
                const nextLevel = 10 * (Math.pow(2, rank.level) - 1)
                await db.set(`${ userId }-${ guildId }.nextLevel`, nextLevel)
                rank = await client.leveling.getUserLevel(userId, guildId)
                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Winner! LEVEL UP!')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }.  ${ username } won 🪙 ${ stakes } Haus Coins and won ${ xpStakes } XP.`)
                    .addField('Level increased to: ', `${ rank.level }`)
                    .addField('XP increased to: ', `${ rank.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ rank.XPoverTime }`)
                if (rank.level === 1) {
                    embed.addField('Total XP needed to level up:', `${ rank.nextLevel + 1 }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ rank.nextLevel }`)
                }

                await interaction.followUp({ embeds: [embed] })

                //just gain xp
            } else {
                client.leveling.addXP(userId, guildId, xpStakes)
                client.leveling.addXPoverTime(userId, guildId, stakes)
                rank = await client.leveling.getUserLevel(userId, guildId)
                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Winner!')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }.  ${ username } won 🪙 ${ stakes } Haus Coins and won ${ xpStakes } XP.`)
                    .addField('Level remained the same: ', `${ rank.level }`)
                    .addField('XP increased to: ', `${ rank.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ rank.XPoverTime }`)
                if (rank.level === 1) {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp + 1 }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp }`)
                }

                await interaction.followUp({ embeds: [embed] })

            }


        } else if (playerDiceRoll < botDiceRoll) {

            let rank = await client.leveling.getUserLevel(userId, guildId)
            let curLevelUp = await db.get(`${ userId }-${ guildId }.nextLevel`)
            //reset back to level 1 with 1 xp
            if (rank.level === 1 && rank.xp < xpStakes) {
                client.leveling.setXP(0, userId, guildId)
                client.leveling.reduceXPoverTime(userId, guildId, stakes)
                rank = await client.leveling.getUserLevel(userId, guildId)
                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Sorry, you lost.')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }.  ${ username } lost 🪙 ${ stakes } Haus Coins and lost ${ xpStakes } XP.`)
                    .addField('Level remained the same: ', `${ rank.level }`)
                    .addField('XP decreased to: ', `${ rank.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ rank.XPoverTime }`)
                if (rank.level === 1) {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp + 1 }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp }`)
                }

                await interaction.followUp({ embeds: [embed] })

                return
            }

            //go down a level and lose xp
            if (rank.xp < xpStakes) {
                let negativeNumber = rank.xp - xpStakes;
                client.leveling.reduceLevels(userId, guildId, 1)
                client.leveling.reduceXPoverTime(userId, guildId, stakes)
                rank = await client.leveling.getUserLevel(userId, guildId)
                const nextLevel = 10 * (Math.pow(2, rank.level) - 1)
                await db.set(`${ userId }-${ guildId }.nextLevel`, nextLevel)
                let total = nextLevel + negativeNumber;
                if (total === 0) {
                    total = 1;
                }
                client.leveling.setXP(total, userId, guildId)
                rank = await client.leveling.getUserLevel(userId, guildId)
                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Sorry, you lost. LEVEL LOST!')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }..  ${ username } lost 🪙 ${ stakes } Haus Coins and lost ${ xpStakes } XP.`)
                    .addField('Level decreased to: ', `${ rank.level }`)
                    .addField('XP decreased to: ', `${ rank.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ rank.XPoverTime }`)
                if (rank.level === 2) {
                    embed.addField('Total XP needed to level up:', `${ rank.nextLevel - 1 }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ rank.nextLevel }`)
                }

                await interaction.followUp({ embeds: [embed] })


                //lose level and xp
            } else if (rank.xp === xpStakes) {
                client.leveling.reduceLevels(userId, guildId, 1)
                client.leveling.reduceXPoverTime(userId, guildId, stakes)
                rank = await client.leveling.getUserLevel(userId, guildId)
                const nextLevel = 10 * (Math.pow(2, rank.level) - 1)
                await db.set(`${ userId }-${ guildId }.nextLevel`, nextLevel)

                client.leveling.setXP(nextLevel, userId, guildId)
                rank = await client.leveling.getUserLevel(userId, guildId)
                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Sorry, you lost. LEVEL LOST!')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }..  ${ username } lost 🪙 ${ stakes } Haus Coins and lost ${ xpStakes } XP.`)
                    .addField('Level decreased to: ', `${ rank.level }`)
                    .addField('XP decreased to: ', `${ rank.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ rank.XPoverTime }`)
                if (rank.level === 2) {
                    embed.addField('Total XP needed to level up:', `${ rank.nextLevel - 1 }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ rank.nextLevel }`)
                }
                await interaction.followUp({ embeds: [embed] })
                //just lose xp
            } else {
                client.leveling.reduceXP(userId, guildId, xpStakes)
                client.leveling.reduceXPoverTime(userId, guildId, stakes)
                rank = await client.leveling.getUserLevel(userId, guildId)
                const embed = new Discord.MessageEmbed()
                    .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                    .setTitle('Sorry, you lost.')
                    .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }.  ${ username } lost 🪙 ${ stakes } Haus Coins and lost ${ xpStakes } XP.`)
                    .addField('Level remained the same: ', `${ rank.level }`)
                    .addField('XP decreased to: ', `${ rank.xp }`)
                    .addField('Haus Coins: ', `🪙 ${ rank.XPoverTime }`)
                if (rank.level === 1) {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp + 1 }`)
                } else {
                    embed.addField('Total XP needed to level up:', `${ curLevelUp }`)
                }

                await interaction.followUp({ embeds: [embed] })


            }
            //tie
        } else {
            let curLevelUp = await db.get(`${ userId }-${ guildId }.nextLevel`)
            rank = await client.leveling.getUserLevel(userId, guildId)
            const embed = new Discord.MessageEmbed()
                .setThumbnail(player.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                .setTitle('TIE GAME')
                .setDescription(`${ username } rolled a ${ dice[playerDiceRoll - 1] } ${ playerDiceRoll } and I rolled a ${ dice[botDiceRoll - 1] } ${ botDiceRoll }.  `)
                .addField('Level remained the same: ', `${ rank.level }`)
                .addField('XP remained the same: ', `${ rank.xp }`)
                .addField('Haus Coins: ', `🪙 ${ rank.XPoverTime }`)
            if (rank.level === 1) {
                embed.addField('Total XP needed to level up:', `${ curLevelUp + 1 }`)
            } else {
                embed.addField('Total XP needed to level up:', `${ curLevelUp }`)
            }

            await interaction.followUp({ embeds: [embed] })

        }

        // new timestamp
        await db.set(`${ userId }-${ guildId }.timestamp`, timestamp)

    }
}

