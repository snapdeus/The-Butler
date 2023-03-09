const Discord = require('discord.js')
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
        // const amount = interaction.options.getNumber("amount")
        const amount = Math.ceil(Math.random() * 25)
        const mentionable = interaction.options.getMentionable('user');

        const client = interaction.client;
        let victimId = mentionable.id;
        let victimUsername = mentionable.user.username;
        let guildId = interaction.guild.id;
        let criminalId = interaction.user.id;
        let criminalUsername = interaction.user.username;



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

        if (interaction.member.roles.cache.has('1083503275447423146')) {
            return await interaction.reply('You are currently wanted! You may not steal again for 10 minutes.')
        }


        let randomNumber = Math.ceil(Math.random() * 10)

        if (randomNumber > 5) {
            let victimRank = await client.leveling.getUserLevel(victimId, guildId, victimUsername);
            let criminalRank = await client.leveling.getUserLevel(criminalId, guildId, criminalUsername);
            client.leveling.addXPoverTime(criminalId, guildId, amount)
            client.leveling.addXPoverTime(victimId, guildId, -amount)



            await interaction.member.roles.add(wantedrole);



            async function removeRole() {
                setTimeout(() => {
                    interaction.member.roles.remove(wantedrole);
                }, 60000 * 10);
            }

            await removeRole()

            const embed = new Discord.MessageEmbed()

                .setTitle(`**${ criminalUsername }** is now wanted!`)
                .addField('Amount stolen:', `🪙 ${ amount }`)
                .addField('Victim of theft: ', `**<@${ victimId }>**`)
                .addField(`${ criminalUsername }'s New Total Balance: `, `🪙 ${ criminalRank.XPoverTime + amount }`)
                .addField(`${ victimUsername }'s New Total Balance: `, `🪙 ${ victimRank.XPoverTime - amount }`)

            await interaction.reply({ content: `**<@${ victimId }>** you have been robbed!`, embeds: [embed] })
        } else {

            const embed = new Discord.MessageEmbed()

                .setTitle(`**${ criminalUsername }** tried to steal but failed! \n ${ criminalUsername } is now Wanted!`)
                .addField('Amount stolen:', `🪙 ${ amount }`)
                .addField('Victim of theft: ', `**<@${ victimId }>**`)

            await interaction.member.roles.add(wantedrole);

            async function removeRole() {
                setTimeout(() => {
                    interaction.member.roles.remove(wantedrole);
                }, 60000 * 10);
            }

            await removeRole()
            await interaction.reply({ content: `**<@${ victimId }>** someone tried and failed to rob you!`, embeds: [embed] })
        }

    }
}