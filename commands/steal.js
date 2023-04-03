const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('steal')
        .setDescription('Attempt to steal from a target')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('The user that is being robbed.')
                .setRequired(true)),
    // .addNumberOption(option =>
    //     option.setName('amount')
    //         .setDescription('The amount to steal')
    //         .setRequired(true)),

    async execute(interaction) {

        const JAIL_ID = '1083788881624842280'
        const WANTED_ROLE_ID = '1083503275447423146'

        // const amount = interaction.options.getNumber("amount")
        const amount = Math.ceil(Math.random() * 100) + 9
        const mentionable = interaction.options.getMentionable('user');

        const client = interaction.client;
        let victimId = mentionable.id;
        let victimUsername = mentionable.user.username;
        let guildId = interaction.guild.id;
        let criminal = interaction.user
        let criminalId = interaction.user.id;
        let criminalUsername = interaction.user.username;
        let victimRank = await client.leveling.getUserLevel(victimId, guildId, victimUsername);
        let criminalRank = await client.leveling.getUserLevel(criminalId, guildId, criminalUsername);


        async function removeRole(role, ms) {
            setTimeout(() => {
                interaction.member.roles.remove(role);
            }, ms);
        }

        let wantedrole = interaction.guild.roles.cache.find(x => x.name === "Wanted");
        if (!wantedrole) {
            try {
                wantedrole = await interaction.guild.roles.create({
                    name: "Wanted",
                    reason: "You stole",
                    color: "#FF69B4",
                })
            } catch (e) {
                console.log(e.stack);
            }
        }


        let prisonerRole = interaction.guild.roles.cache.find(x => x.name === "Prisoner");
        if (!prisonerRole) {
            try {
                prisonerRole = await interaction.guild.roles.create({

                    name: "Prisoner",
                    reason: "You stole",
                    color: "#FFF",

                })
            } catch (e) {
                console.log(e.stack);
            }
        }
        if (interaction.member.roles.cache.has(WANTED_ROLE_ID)) {
            return await interaction.reply('You are currently wanted! You may not steal again for 5 minutes since your last attempt.')
        }



        if (interaction.user.id !== criminalId) {
            return await interaction.followUp({
                content: "This button is not for you",
                ephemeral: true
            })
        }

        if (victimRank.XPoverTime < 0) {
            const embed = new Discord.MessageEmbed()
                .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setTitle(`***THEFT PARTIALLY DENIED***`)
                .setDescription(`*basic morality*`)
                .addField('Attempted total amount:', `🪙 ${ amount }`)
                .addField('Victim of theft: ', `**<@${ victimId }>** who only has 🪙${ victimRank.XPoverTime } in the bank...`)
                .addField('Amount stolen:', `🪙${ (amount / 2) } from the bank and 🪙0 from ${ victimUsername } `)

            client.leveling.addXPoverTime(criminalId, guildId, amount)
            return await interaction.reply({
                content: `Why are you attempting to steal from poor <@${ victimId }>? They have no money! But the bank did...`,
                embeds: [embed]
            })
        }


        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()

                    .setLabel('Steal')
                    .setStyle('PRIMARY')
                    .setCustomId("Steal" + interaction.user.id))

        row.addComponents(
            new MessageButton()
                .setLabel('Block the steal!')
                .setStyle('DANGER')
                .setCustomId("Block" + victimId))


        const filter = async i => i.customId.endsWith(interaction.user.id) || i.customId.endsWith(victimId)
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120000 });


        let randomNumber = Math.ceil(Math.random() * 10)

        const embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`**${ criminalUsername }** is attempting theft...`)
            .addField('Attempted total amount:', `🪙 ${ amount }`)
            .addField('Victim of theft: ', `**<@${ victimId }>**`)



        collector.on('collect', async i => {
            if (i.user.id === victimId) {

                const embed = new Discord.MessageEmbed()
                    .setThumbnail('https://i.imgur.com/E0AR48O.png')
                    .setTitle(`ROBBERY BLOCKED!`)

                row.components[0].setDisabled(true);
                row.components[1].setDisabled(true);
                await i.deferUpdate();

                return await interaction.editReply({ content: `ROBBERY BLOCKED!`, embeds: [embed], components: [row] })

            }

            if (i.user.id === criminalId) {

                return await i.deferUpdate();

            }

            return await i.deferUpdate()
        });

        setTimeout(function () {
            collector.stop()

            row.components[0].setDisabled(true);
            row.components[1].setDisabled(true);
            interaction.editReply({ components: [row] })

        }, 10000);



        // client.channels.cache.get('884434543543726134').send({ content: `Hey **<@${ victimId }>** you are currently being robbed!`, embeds: [embed],components: [row] })

        await interaction.reply({ content: `Hey **<@${ victimId }>** you are currently being robbed!`, embeds: [embed], components: [row] })

        if (randomNumber >= 6) {
            // if (randomNumber > 10) {
            collector.on('collect', async i => {

                if (i.user.id === criminalId && !i.customId.startsWith("Block")) {
                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true);
                    const embed = new Discord.MessageEmbed()
                        .setFooter({ text: "*Have you seen this thief?*", iconURL: criminal.displayAvatarURL() })
                        .setThumbnail("https://i.imgur.com/EbN8M82.png")
                        .setTitle(`***SUCESSFUL ROBBERY!***`)
                        .addField('Amount stolen:', `🪙${ (amount / 2) } from the bank and 🪙${ (amount / 2) } from ${ victimUsername } `)
                        .addField('Victim of theft: ', `**<@${ victimId }>**`)
                        .addField(`${ victimUsername }'s total balance decreased to: `, `🪙 ${ victimRank.XPoverTime - (amount / 2) }`)
                        .setDescription(`**${ criminalUsername }** is now wanted!`)
                        .addField(`Your total balance increased to: `, `🪙 ${ criminalRank.XPoverTime + amount }`)
                    await interaction.editReply({ content: `**<@${ victimId }>** you have been robbed!`, embeds: [embed], components: [row] })


                    await interaction.member.roles.add(wantedrole);
                    await removeRole(wantedrole, 300000)

                    client.leveling.addXPoverTime(criminalId, guildId, amount)
                    client.leveling.addXPoverTime(victimId, guildId, -(amount / 2))

                    collector.stop()
                    return
                }

                i.deferUpdate()
            });

            setTimeout(function () {
                row.components[0].setDisabled(true);
                interaction.editReply({ components: [row] });
            }, 10000);



        } else if (randomNumber >= 3 && randomNumber < 6) {
            // } else if (randomNumber > 10) {
            collector.on('collect', async i => {

                if (i.user.id === criminalId && !i.customId.startsWith("Block")) {
                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true);
                    const embed = new Discord.MessageEmbed()
                        .setFooter({ text: "*Have you seen this thief?*", iconURL: criminal.displayAvatarURL() })
                        .setThumbnail("https://i.imgur.com/OWi98Od.png")
                        .setTitle(`***ROBBERY FAILED!***`)
                        .setDescription(`**${ criminalUsername }** is now wanted!`)
                        .addField(`**${ criminalUsername }** tried to steal but failed!`, "Try again in 5 minutes!")
                        .addField('Victim of attempted theft: ', `**<@${ victimId }>**`)
                    await interaction.editReply({ content: `**<@${ victimId }>** someone tried and failed to rob you!`, embeds: [embed], components: [row] })


                    await interaction.member.roles.add(wantedrole);
                    await removeRole(wantedrole, 300000)
                    collector.stop()
                    return
                }
                i.deferUpdate()
            });

            setTimeout(function () {
                row.components[0].setDisabled(true);
                interaction.editReply({ components: [row] });
            }, 10000);




        } else if (randomNumber >= 1 && randomNumber < 3) {
            // } else if (randomNumber > 0) {




            collector.on('collect', async i => {

                if (i.user.id === criminalId && !i.customId.startsWith("Block")) {
                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true);
                    const embed = new Discord.MessageEmbed()
                        .setFooter({ text: `*Have you seen this thief?*`, iconURL: criminal.displayAvatarURL() })
                        .setThumbnail("https://i.imgur.com/OWi98Od.png")
                        .setTitle(`***SUSPECT APPREHENDED!***`)
                        .setDescription(`**${ criminalUsername }** was captured while thieving and is now in Jail!`)
                        .addField(`${ criminalUsername }'s Penalty is: `, `🪙 ${ amount } `)
                        .addField(`Your total balance decreased to: `, `🪙 ${ criminalRank.XPoverTime - amount }`)
                        .addField(`Victim of attempted theft:`, `${ victimUsername }`)
                    await interaction.editReply({ content: `${ criminalUsername } went to jail...`, components: [row], embeds: [embed] })
                    client.leveling.addXPoverTime(criminalId, guildId, -amount)

                    await interaction.member.roles.add(prisonerRole);

                    await removeRole(prisonerRole, 30000)

                    collector.stop()
                    client.channels.cache.get(JAIL_ID).send({ content: `Hello there, <@${ criminalId }>! Welcome to jail.`, embeds: [embed] })
                    return
                }
                i.deferUpdate()
            });

        }
    }
}