const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user')
const { msToTime } = require('../utils/math')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('getitem')
        .setDescription('Get item!!'),

    async execute(interaction) {





        // const amount = interaction.options.getNumber("amount")
        const amount = Math.ceil(Math.random() * 200) + 50




        const client = interaction.client;

        let guildId = interaction.guild.id;
        let user = interaction.user
        let userId = interaction.user.id;
        let username = interaction.user.username;
        let userRank = await client.leveling.getUserLevel(userId, guildId, username);









        let mongoUser = await User.findOne({ userId: userId })
        let timestamp = mongoUser.timestamp
        // const timeLimit = 86400000
        const timeLimit = 864

        //check date to see if you can use daily
        const thedate = Date.now()
        const timeDate = new Date(thedate)
        const timeWaited = timeDate - timestamp

        if (timeWaited < timeLimit) {
            const timeLeft = msToTime(timeLimit - timeWaited)


            return await interaction.reply({
                content: `You must wait ${ timeLeft } to use this command again \n\nYaaawn...it's ${ timeDate.toLocaleTimeString() } here! What's that mean?`,

            })



        }


        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()

                    .setLabel('Blue Item')
                    .setStyle('PRIMARY')
                    .setCustomId("Blue" + interaction.user.id))

        row.addComponents(
            new MessageButton()
                .setLabel('Red Item')
                .setStyle('DANGER')
                .setCustomId("Red" + interaction.user.id))
        row.addComponents(
            new MessageButton()
                .setLabel('Green Item')
                .setStyle('SUCCESS')
                .setCustomId("Green" + interaction.user.id))
        row.addComponents(
            new MessageButton()
                .setLabel('Gray Item')
                .setStyle('SECONDARY')
                .setCustomId("Gray" + interaction.user.id))


        const filter = async i => i.customId.endsWith(interaction.user.id)
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120000 });


        let randomNumber = Math.ceil(Math.random() * 10)

        const embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`**${ username }**'s daily cash chance!`)





        await interaction.reply({ content: `Hey **<@${ userId }>** let's get that cash!`, embeds: [embed], components: [row] })

        let randomItem = 1;
        // const file = new Discord.MessageAttachment(`/home/snapdeus/The-Butler/resources/rpgItems/${ randomItem }.png`);
        const file = new Discord.MessageAttachment(`C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\${ randomItem }.png`);
        collector.on('collect', async i => {

            if (i.user.id !== userId) {
                return await i.followUp({
                    content: "This button is not for you",
                    ephemeral: true
                })
            }

            //when you click the button, it adds the timestamp
            mongoUser.timestamp = Date.now()
            await mongoUser.save();
            //process the different buttons
            if (i.customId.startsWith("Blue")) {
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true);
                row.components[2].setDisabled(true);
                const embed = new Discord.MessageEmbed()
                    .setFooter({ text: "Look who won some cash!*", iconURL: user.displayAvatarURL() })
                    .setTitle(`***DAILY CASH!!!***`)
                    .addField('Daily cash won:', `🪙${ (amount) }`)
                    .addField(`Your total balance increased to: `, `🪙 ${ userRank.XPoverTime + amount }`)
                    .setThumbnail(`attachment://${ randomItem }.png`)
                await interaction.editReply({ content: `**<@${ userId }>** you got that cash!`, embeds: [embed], components: [row], files: [file] })

                client.leveling.addXPoverTime(userId, guildId, amount)

                collector.stop()
                i.deferUpdate()
                return
            }
            if (i.customId.startsWith("Red")) {
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true);
                row.components[2].setDisabled(true);
                const embed = new Discord.MessageEmbed()
                    .setFooter({ text: "Look who won some cash!*", iconURL: user.displayAvatarURL() })
                    .setTitle(`***DAILY CASH!!!***`)
                    .addField('Daily cash won:', `🪙${ (amount) }`)
                    .addField(`Your total balance increased to: `, `🪙 ${ userRank.XPoverTime + amount }`)
                await interaction.editReply({ content: `**<@${ userId }>** you got that cash!`, embeds: [embed], components: [row] })

                client.leveling.addXPoverTime(userId, guildId, amount)

                collector.stop()
                i.deferUpdate()
                return
            }
            if (i.customId.startsWith("Green")) {
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true);
                row.components[2].setDisabled(true);
                const embed = new Discord.MessageEmbed()
                    .setFooter({ text: "Look who won some cash!*", iconURL: user.displayAvatarURL() })
                    .setTitle(`***DAILY CASH!!!***`)
                    .addField('Daily cash won:', `🪙${ (amount) }`)
                    .addField(`Your total balance increased to: `, `🪙 ${ userRank.XPoverTime + amount }`)
                await interaction.editReply({ content: `**<@${ userId }>** you got that cash!`, embeds: [embed], components: [row] })

                client.leveling.addXPoverTime(userId, guildId, amount)

                collector.stop()
                i.deferUpdate()
                return
            }
            if (i.customId.startsWith("Gray")) {
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true);
                row.components[2].setDisabled(true);
                const embed = new Discord.MessageEmbed()
                    .setFooter({ text: "Look who won some cash!*", iconURL: user.displayAvatarURL() })
                    .setTitle(`***DAILY CASH!!!***`)
                    .addField('Daily cash won:', `🪙${ (amount) }`)
                    .addField(`Your total balance increased to: `, `🪙 ${ userRank.XPoverTime + amount }`)
                await interaction.editReply({ content: `**<@${ userId }>** you got that cash!`, embeds: [embed], components: [row] })

                client.leveling.addXPoverTime(userId, guildId, amount)

                collector.stop()
                i.deferUpdate()
                return
            }





            i.deferUpdate()
        });

        setTimeout(function () {
            row.components[0].setDisabled(true);
            row.components[1].setDisabled(true);
            row.components[2].setDisabled(true);
            interaction.editReply({ components: [row] });
        }, 120000);




    }
}