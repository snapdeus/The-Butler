const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const User = require('../models/user');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Answer trivia question!'),


    async execute(interaction) {

        let randomNumber = Math.ceil(Math.random() * 10);

        const client = interaction.client;
        let user = interaction.user;
        let guildId = interaction.guild.id;
        let userId = interaction.user.id;
        let userName = interaction.user.username;

        let userRank = await client.leveling.getUserLevel(userId, guildId, userName);

        let mongoUser = await User.findOne({ userId: userId });
        async function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const { data } = await axios.get('https://the-trivia-api.com/api/questions?limit=1');


        const { category, question, difficulty, correctAnswer, incorrectAnswers, tags, id } = data[0];
        let amount = null;

        switch (difficulty) {
            case 'easy':
                amount = 50;
                break;
            case 'medium':
                amount = 100;
                break;
            case 'hard':
                amount = 150;
                break;
            default:
                amount = 50;
        }


        const answerArray = [correctAnswer, ...incorrectAnswers];
        shuffleArray(answerArray);
        const row = new MessageActionRow();
        row.addComponents(
            new MessageButton()
                .setLabel(`${ answerArray[0] }`)
                .setStyle('PRIMARY')
                .setCustomId(`${ answerArray[0] }` + `${ interaction.user.id }`));
        row.addComponents(
            new MessageButton()
                .setLabel(`${ answerArray[1] }`)
                .setStyle('PRIMARY')
                .setCustomId(`${ answerArray[1] }` + `${ interaction.user.id }`));
        row.addComponents(
            new MessageButton()
                .setLabel(`${ answerArray[2] }`)
                .setStyle('PRIMARY')
                .setCustomId(`${ answerArray[2] }` + `${ interaction.user.id }`));
        row.addComponents(
            new MessageButton()
                .setLabel(`${ answerArray[3] }`)
                .setStyle('PRIMARY')
                .setCustomId(`${ answerArray[3] }` + `${ interaction.user.id }`));




        const filter = async i => i.customId.endsWith(interaction.user.id);
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });


        const embed = new Discord.MessageEmbed()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`**${ userName }** is playing trivia!`)
            .setFooter({ text: 'You have 25 seconds...' })
            .addFields(
                { name: 'Question:', value: `${ question }` },
                { name: 'Category:', value: `${ category }` },
                { name: 'Difficulty:', value: `${ difficulty }` },
            );





        await interaction.reply({ content: `Hey **<@${ userId }>** let's play trivia!`, embeds: [embed], components: [row] });


        collector.on('collect', async i => {

            if (i.user.id !== userId) {
                console.log('not for you inside of trivia.js');
                return await i.followUp({
                    content: "This button is not for you",
                    ephemeral: true
                });
            }


            //process the different buttons
            if (i.customId.startsWith(correctAnswer)) {
                row.components[0].setDisabled(true);
                row.components[1].setDisabled(true);
                row.components[2].setDisabled(true);
                row.components[3].setDisabled(true);
                const embed = new Discord.MessageEmbed()
                    .setFooter({ text: "Trivia question answered correctly!", iconURL: user.displayAvatarURL() })
                    .setTitle(`***CORRECT!***`)
                    .addFields(
                        { name: `Question:`, value: `${ question }` },
                        { name: `Correct Answer:`, value: `${ correctAnswer }` },
                        { name: `Cash Prize!:`, value: `🪙${ amount }` },
                        { name: `Your total balance increased to: `, value: `🪙 ${ userRank.XPoverTime + amount }` },
                        { name: `XP Gained:`, value: `${ amount }` },

                    );






                //gain level and xp
                let curLevelUp = mongoUser.nextLevel;
                if (mongoUser.xp + amount > curLevelUp) {
                    embed.addFields({ name: 'LEVEL UP!', value: `↗️↗️↗️` });
                    let difference = (mongoUser.xp + amount) - curLevelUp;
                    mongoUser.level += 1;
                    const nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1);
                    mongoUser.xp = difference;
                    embed.addFields({ name: `Your XP increased to: `, value: `${ difference } XP` });
                    mongoUser.nextLevel = nextLevel;
                    await mongoUser.save();
                } else {
                    embed.addFields({ name: `Your XP increased to: `, value: `${ userRank.xp + amount } XP` });
                    client.leveling.addXP(userId, guildId, amount);
                }
                client.leveling.addXPoverTime(userId, guildId, amount);

                await interaction.editReply({ content: `**<@${ userId }>** you knew the answer!`, embeds: [embed], components: [row] });


                collector.stop();
                i.deferUpdate();
                return;
            } else {
                row.components[0].setDisabled(true);
                row.components[1].setDisabled(true);
                row.components[2].setDisabled(true);
                row.components[3].setDisabled(true);
                //OLD WAY
                // const wrongAnswerObject = row.components.filter(x => x.customId === i.customId);
                // const { customId } = wrongAnswerObject[0];
                // const wrongAnswer = customId.replace(interaction.user.id, '')
                //OPTIMIZED WAY
                const wrongAnswer = row.components
                    .find(x => x.customId === i.customId)
                    .customId.replace(interaction.user.id, '');

                const embed = new Discord.MessageEmbed()
                    .setFooter({ text: "Trivia question answered incorrectly*", iconURL: user.displayAvatarURL() })
                    .setTitle(`***XX*** ***WRONG*** ***XX*** `)
                    .addFields(
                        { name: `Question:`, value: `${ question }` },
                        { name: `Correct Answer:`, value: `${ correctAnswer }` },
                        { name: `You incorrectly chose:`, value: `${ wrongAnswer }` },
                    );

                await interaction.editReply({ content: `**<@${ userId }>** you DID NOT know the answer!`, embeds: [embed], components: [row] });



                collector.stop();
                i.deferUpdate();
                return;
            }

        });

        setTimeout(function () {
            row.components[0].setDisabled(true);
            row.components[1].setDisabled(true);
            row.components[2].setDisabled(true);
            row.components[3].setDisabled(true);
            interaction.editReply({ components: [row] });
        }, 25000);

    }
};