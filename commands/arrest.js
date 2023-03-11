const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('arrest')
        .setDescription('Attempt to arrest a target')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('The user that is being arrested.')
                .setRequired(true)),
    // .addNumberOption(option =>
    //     option.setName('amount')
    //         .setDescription('The amount to steal')
    //         .setRequired(true)),

    async execute(interaction) {

        const JAIL_ID = '1083788881624842280'
        const WANTED_ROLE_ID = '1083503275447423146'

        // const amount = interaction.options.getNumber("amount")
        const amount = Math.ceil(Math.random() * 25)
        const mentionable = interaction.options.getMentionable('user');
        let randomNumber = Math.ceil(Math.random() * 10)

        const client = interaction.client;
        let arrestedId = mentionable.id;
        let arrestedUsername = mentionable.user.username;
        let guildId = interaction.guild.id;
        let deputyId = interaction.user.id;
        let deputyUsername = interaction.user.username;
        let arrestedRank = await client.leveling.getUserLevel(arrestedId, guildId, arrestedUsername);
        let deputyRank = await client.leveling.getUserLevel(deputyId, guildId, deputyUsername);


        async function removeRole(role, ms) {
            setTimeout(() => {
                mentionable.roles.remove(role);
            }, ms);
        }

        async function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
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


        if (mentionable.roles.cache.has(WANTED_ROLE_ID)) {
            const embed = new Discord.MessageEmbed()
                .setThumbnail(mentionable.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setTitle(`**${ deputyUsername }** is attempting to arrest...`)
                .addField(`${ arrestedUsername }`, `For the crime of being wanted.`)
            let outcome;
            if (randomNumber > 10) {

                client.leveling.addXPoverTime(arrestedId, guildId, -amount)
                client.leveling.addXPoverTime(deputyId, guildId, amount)
                outcome = new Discord.MessageEmbed()
                    .setThumbnail("https://i.imgur.com/OWi98Od.png")
                    .setTitle(`***SUSPECT APPREHENDED!***`)
                    .setDescription(`**${ arrestedUsername }** was arrested by a bounty Hunter!`)
                    .addField(`${ arrestedUsername }'s bounty is 🪙 ${ amount }`, `**${ arrestedUsername }'s** new total balance decreased to: 🪙 ${ arrestedRank.XPoverTime - amount }`)
                    .addField(`${ deputyUsername } wins the bounty! `, `🪙 ${ amount } added to your account! \n **${ deputyUsername }'s** new total balance increased to: 🪙 ${ deputyRank.XPoverTime + amount }`);

                outcome.arrested = true;

            } else {
                client.leveling.addXPoverTime(arrestedId, guildId, amount)
                client.leveling.addXPoverTime(deputyId, guildId, -amount)
                outcome = new Discord.MessageEmbed()
                    .setThumbnail("https://i.imgur.com/EbN8M82.png")
                    .setTitle(`***SUSPECT ESCAPED!***`)
                    .setDescription(`**${ arrestedUsername }** escaped! They lost their wanted status!`)
                    .addField(`${ arrestedUsername }'s made off with your bounty! 🪙 ${ amount }`, `**${ arrestedUsername }'s** new total balance increased to: 🪙 ${ arrestedRank.XPoverTime + amount }`)
                    .addField(`_____`, ` `)
                    .addField(`${ deputyUsername } lost the bounty! `, `🪙 ${ amount } removed from your account! \n **${ deputyUsername }'s** new total balance decreased to: 🪙 ${ deputyRank.XPoverTime - amount }`);
                outcome.arrested = false;
                await mentionable.roles.remove(wantedrole);

            }


            await interaction.reply({ content: `${ deputyUsername } is attempting to arrest <@${ arrestedId }>`, embeds: [embed] })
            await sleep(4000)
            if (outcome.arrested) {
                client.channels.cache.get(JAIL_ID).send({ content: `Hello there, <@${ arrestedId }>! Welcome to jail. \n You were just arrested by ${ deputyUsername } for the crime of being wanted.`, embeds: [outcome] })
                await mentionable.roles.add(prisonerRole);

                await removeRole(prisonerRole, 30000);
                await mentionable.roles.remove(wantedrole);
                return await interaction.editReply({ content: `${ deputyUsername } arrested <@${ arrestedId }>`, embeds: [embed, outcome] })
            } else {
                return await interaction.editReply({ content: ` <@${ arrestedId }> escaped!!`, embeds: [embed, outcome] })
            }

        }



        return await interaction.reply({ content: `<@${ arrestedId }> is not wanted. Why did you attempt to arrest them?` })



    }
}