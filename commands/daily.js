const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getcash')
        .setDescription('Win Cash Daily!'),

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
        const timeLimit = 86400000

        function msToTime(ms) {
            const days = Math.floor(ms / (24 * 60 * 60 * 1000));
            const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
            const seconds = Math.floor((ms % (60 * 1000)) / 1000);

            return `${ days } days, ${ hours } hours, ${ minutes } minutes, ${ seconds } seconds`;
        }
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





        if (interaction.user.id !== userId) {
            return await interaction.reply({
                content: "This button is not for you",
                ephemeral: true
            })
        }



        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()

                    .setLabel('Blue Mystery')
                    .setStyle('PRIMARY')
                    .setCustomId("Daily1" + interaction.user.id))

        row.addComponents(
            new MessageButton()
                .setLabel('Red Mystery')
                .setStyle('DANGER')
                .setCustomId("Daily2" + interaction.user.id))
        row.addComponents(
            new MessageButton()
                .setLabel('Green Mystery')
                .setStyle('SUCCESS')
                .setCustomId("Daily3" + interaction.user.id))


        const filter = async i => i.customId.endsWith(interaction.user.id)
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120000 });


        let randomNumber = Math.ceil(Math.random() * 10)

        const embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`**${ username }**'s daily cash chance!`)





        await interaction.reply({ content: `Hey **<@${ userId }>** let's get that cash!`, embeds: [embed], components: [row] })


        collector.on('collect', async i => {
            //when you click the button, it adds the timestamp
            mongoUser.timestamp = Date.now()
            await mongoUser.save();
            //process the different buttons
            if (i.customId.startsWith("Daily1")) {
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
            if (i.customId.startsWith("Daily2")) {
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
            if (i.customId.startsWith("Daily3")) {
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