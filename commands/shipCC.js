const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');
const Bag = require('../models/bag')
const { MessageActionRow, MessageButton } = require('discord.js');
const { botScore } = require('../utils/score');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('shipcc')
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


        const mongoUser = await User.find({ userId: userId });
        if (!mongoUser) {
            const user = new User({
                username: `${ username }`,
                userId: `${ userId }`,
                guildId: `${ guildId }`,
                xp: 1,
                xpOverTime: 1,
                timestamp: null,
                gameTimestamp: null,
                scc_wins: 0,
                scc_losses: 0,
                scc_ties: 0,
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

        const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
        const { playerDiceRoll, botDiceRoll, playerStatus, botStatus } = await client.leveling.rollShipCC(userId, guildId, username, 5, 5)
        const rank = await client.leveling.getUserLevel(userId, guildId, username)
        // console.log(rank)
        // console.log(playerDiceRoll)
        const embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`${ username } is playing Ship, Captain & Crew!`)
            .setDescription(`The Butler will roll first`)
        //     .addField('Player Dice Roll ', `${ playerDiceRoll }`)

        // if (playerStatus.roll_S_C_C) {
        //     embed.addField('Player', 'has Ship, Captain & Crew!')
        // } else if (playerStatus.roll_S_C) {
        //     embed.addField('Player', 'has Ship and Captain')
        // } else if (playerStatus.roll_S) {
        //     embed.addField('Player', 'has Ship!')
        // }
        embed.addField("The Butler's first roll is ", `${ botDiceRoll }`)
        if (botStatus.roll_S_C_C) {
            embed.addField('The Butler', 'has Ship, Captain & Crew!')
        } else if (botStatus.roll_S_C) {
            embed.addField('The Butler', 'has Ship and Captain')
        } else if (botStatus.roll_Ship) {
            embed.addField('The Butler', 'has Ship!')
        }

        botStatus.roll_number += 1;

        async function botRollAgain(b_val) {
            const { botDiceRoll, botStatus } = await client.leveling.rollShipCC(userId, guildId, username, b_val, 5)
            return { botDiceRoll, botStatus }
        }



        await interaction.reply({ embeds: [embed] })

        // console.log("1st roll bot status is ", botStatus)
        //SECOND ROLL
        if (botScore.roll) {
            botStatus.roll_number += 1;
            if (botStatus.roll_S_C_C) {
                const { botDiceRoll, botStatus } = await botRollAgain(2)
                setTimeout(function () {
                    embed.addField("The Butler's second roll is ", `${ botDiceRoll }`)
                    interaction.editReply({ embeds: [embed] });
                }, 2000);
            } else if (botStatus.roll_S_C) {
                const { botDiceRoll, botStatus } = await botRollAgain(3)
                setTimeout(function () {


                    embed.addField("The Butler's second roll is ", `${ botDiceRoll }`)
                    if (botDiceRoll.includes(4)) {
                        embed.addField('The Butler', 'has Ship, Captain & Crew!')
                    }

                    interaction.editReply({ embeds: [embed] });
                }, 2000);
            } else if (botStatus.roll_Ship) {
                const { botDiceRoll, botStatus } = await botRollAgain(4)
                setTimeout(function () {


                    embed.addField("The Butler's second roll is ", `${ botDiceRoll }`)
                    if (botDiceRoll.includes(5) && botDiceRoll.includes(4)) {
                        embed.addField('The Butler', 'has Ship, Captain & Crew!')
                    } else if (botDiceRoll.includes(5)) {
                        embed.addField('The Butler', 'has Ship and Captain')
                    }
                    interaction.editReply({ embeds: [embed] });
                }, 2000);
            } else {
                const { botDiceRoll, botStatus } = await botRollAgain(5)
                setTimeout(function () {

                    embed.addField("The Butler's second roll is ", `${ botDiceRoll }`)
                    if (botDiceRoll.includes(6) && botDiceRoll.includes(5) && botDiceRoll.includes(4)) {
                        embed.addField('The Butler', 'has Ship, Captain & Crew!')
                    } else if (botDiceRoll.includes(6) && botDiceRoll.includes(5)) {
                        embed.addField('The Butler', 'has Ship and Captain')
                    } else if (botDiceRoll.includes(6)) {
                        embed.addField('The Butler', 'has Ship!')
                    }
                    interaction.editReply({ embeds: [embed] });
                }, 2000);
            }
            // console.log("2nd roll bot status is ", botStatus)
        }


        //THIRD ROLL
        if (botScore.roll) {
            botStatus.roll_number += 1;
            if (botStatus.roll_S_C_C) {
                const { botDiceRoll, botStatus } = await botRollAgain(2)

                setTimeout(function () {
                    embed.addField("The Butler's third roll is ", `${ botDiceRoll }`)
                    interaction.editReply({ embeds: [embed] });
                }, 4000);
            } else if (botStatus.roll_S_C) {
                const { botDiceRoll, botStatus } = await botRollAgain(3)
                setTimeout(function () {


                    embed.addField("The Butler's third roll is ", `${ botDiceRoll }`)
                    if (botDiceRoll.includes(4)) {
                        embed.addField('The Butler', 'has Ship, Captain & Crew!')
                    }

                    interaction.editReply({ embeds: [embed] });
                }, 4000);
            } else if (botStatus.roll_Ship) {
                const { botDiceRoll, botStatus } = await botRollAgain(4)
                setTimeout(function () {


                    embed.addField("The Butler's third roll is ", `${ botDiceRoll }`)
                    if (botDiceRoll.includes(5) && botDiceRoll.includes(4)) {
                        embed.addField('The Butler', 'has Ship, Captain & Crew!')
                    } else if (botDiceRoll.includes(5)) {
                        embed.addField('The Butler', 'has Ship and Captain')
                    }

                    interaction.editReply({ embeds: [embed] });
                }, 4000);
            } else {
                const { botDiceRoll, botStatus } = await botRollAgain(5)
                setTimeout(function () {

                    embed.addField("The Butler's third roll is ", `${ botDiceRoll }`)
                    if (botDiceRoll.includes(6) && botDiceRoll.includes(5) && botDiceRoll.includes(4)) {
                        embed.addField('The Butler', 'has Ship, Captain & Crew!')
                    } else if (botDiceRoll.includes(6) && botDiceRoll.includes(5)) {
                        embed.addField('The Butler', 'has Ship and Captain')
                    } else if (botDiceRoll.includes(6)) {
                        embed.addField('The Butler', 'has Ship!')
                    }
                    interaction.editReply({ embeds: [embed] });
                }, 4000);
            }
            // console.log("3rd roll bot status is ", botStatus)
        }

        if (botStatus.roll_number === 3) {

            botStatus.roll_S_C_C = false;
            botStatus.roll_S_C = false;
            botStatus.roll_Ship = false;
            botStatus.roll_Captain = false;
            botStatus.roll_Crew = false;
            botStatus.roll_number = 0;

        }



        // const row = new MessageActionRow()
        //     .addComponents(
        //         new MessageButton()
        //             .setCustomId('primary')
        //             .setLabel('Roll again?')
        //             .setStyle('PRIMARY')
        //             .setCustomId(`SCC_` + interaction.user.id)

        //     );
        // const filter = async i => i.customId.endsWith(interaction.user.id)
        // const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        // collector.on('collect', async i => {

        //     if (i.user.id === userId) {

        //         ///put edit the embed message her


        //         row.components[0].setDisabled(true)
        //         interaction.editReply({ components: [row] });
        //     }
        // });
        // await interaction.reply({ embeds: [embed], components: [row], })
        // setTimeout(function () {
        //     row.components[0].setDisabled(true);
        //     interaction.editReply({ components: [row] });
        // }, 60000);
    }
}
