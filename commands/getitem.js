const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user')
const { msToTime } = require('../utils/math')

const { createCanvas, loadImage, Image } = require('canvas')



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









        // let mongoUser = await User.findOne({ userId: userId })
        // let timestamp = mongoUser.timestamp
        // // const timeLimit = 86400000
        // const timeLimit = 864

        // //check date to see if you can use daily
        // const thedate = Date.now()
        // const timeDate = new Date(thedate)
        // const timeWaited = timeDate - timestamp

        // if (timeWaited < timeLimit) {
        //     const timeLeft = msToTime(timeLimit - timeWaited)


        //     return await interaction.reply({
        //         content: `You must wait ${ timeLeft } to use this command again \n\nYaaawn...it's ${ timeDate.toLocaleTimeString() } here! What's that mean?`,

        //     })



        // }


        // const row = new MessageActionRow()
        //     .addComponents(
        //         new MessageButton()

        //             .setLabel('Blue Item')
        //             .setStyle('PRIMARY')
        //             .setCustomId("Blue" + interaction.user.id))

        // row.addComponents(
        //     new MessageButton()
        //         .setLabel('Red Item')
        //         .setStyle('DANGER')
        //         .setCustomId("Red" + interaction.user.id))
        // row.addComponents(
        //     new MessageButton()
        //         .setLabel('Green Item')
        //         .setStyle('SUCCESS')
        //         .setCustomId("Green" + interaction.user.id))
        // row.addComponents(
        //     new MessageButton()
        //         .setLabel('Gray Item')
        //         .setStyle('SECONDARY')
        //         .setCustomId("Gray" + interaction.user.id))


        // const filter = async i => i.customId.endsWith(interaction.user.id)
        // const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120000 });


        // let randomNumber = Math.ceil(Math.random() * 10)

        // const embed = new Discord.MessageEmbed()
        //     .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        //     .setTitle(`**${ username }**'s daily cash chance!`)
        // const embeds = [
        //     new Discord.MessageEmbed().setURL("https://example.org/").setImage("https://i.imgur.com/l8Sf6EQ.png")
        //         .setTitle("title").setDescription("desc").setFooter({ text: "footer" }),
        //     new Discord.MessageEmbed().setURL("https://example.org/").setImage("https://i.imgur.com/qpcAzHq.png"),
        //     new Discord.MessageEmbed().setURL("https://example.org/").setImage("https://i.imgur.com/yfdqrLk.png"),
        //     new Discord.MessageEmbed().setURL("https://example.org/").setImage("https://i.imgur.com/sqpGSdd.png"),
        // ];
        // const img = new Image()
        // img.onload = () => ctx.drawImage(img, 0, 0)
        // img.onerror = err => { throw err }
        // img.src = 'images/squid.png'
        // const canvas = createCanvas(100, 100);
        // const ctx = canvas.getContext('2d');


        // const image1 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\100.png'
        // const image2 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\099.png'
        // const image3 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\098.png'
        // const image4 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\097.png'
        // const image5 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\096.png'
        // const image6 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\095.png'
        // const image7 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\094.png'
        // const image8 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\093.png'


        // async function loadImageAndDraw(x, y, imagePath) {
        //     const image = await loadImage(imagePath);
        //     ctx.drawImage(image, x, y, 25, 25);
        // }
        // async function drawImages() {
        //     const imagePaths = [image1, image2, image3, image4, image5, image6, image7, image8];
        //     const positions = [{ x: 0, y: 0 }, { x: 25, y: 0 }, { x: 50, y: 0 }, { x: 75, y: 0 }, { x: 0, y: 25 }, { x: 25, y: 25 }, { x: 50, y: 25 }, { x: 75, y: 25 }];
        //     await Promise.all(imagePaths.map((imagePath, index) => loadImageAndDraw(positions[index].x, positions[index].y, imagePath)));
        // }

        // await drawImages();

        // function getQuadrantBuffer(originalCanvas, x, y, width, height) {
        //     const quadrantCanvas = createCanvas(width, height);
        //     const quadrantCtx = quadrantCanvas.getContext('2d');
        //     quadrantCtx.drawImage(originalCanvas, x, y, width, height, 0, 0, width, height);
        //     return quadrantCanvas.toBuffer('image/png');
        // }

        // function getAllQuadrantBuffers() {
        //     const quadrant1 = getQuadrantBuffer(canvas, 0, 0, 25, 25);
        //     const quadrant2 = getQuadrantBuffer(canvas, 25, 0, 25, 25);
        //     const quadrant3 = getQuadrantBuffer(canvas, 50, 0, 25, 25);
        //     const quadrant4 = getQuadrantBuffer(canvas, 75, 0, 25, 25);
        //     const quadrant5 = getQuadrantBuffer(canvas, 0, 25, 25, 25);
        //     const quadrant6 = getQuadrantBuffer(canvas, 25, 25, 25, 25);
        //     const quadrant7 = getQuadrantBuffer(canvas, 50, 25, 25, 25);
        //     const quadrant8 = getQuadrantBuffer(canvas, 75, 25, 25, 25);
        //     return [quadrant1, quadrant2, quadrant3, quadrant4, quadrant5, quadrant6, quadrant7, quadrant8];
        // }

        // const allBuffers = getAllQuadrantBuffers();

        // const attachment = new Discord.MessageAttachment(allBuffers[0], 'img.png');
        // const attachment2 = new Discord.MessageAttachment(allBuffers[1], 'img2.png');
        // const attachment3 = new Discord.MessageAttachment(allBuffers[2], 'img3.png');
        // const attachment4 = new Discord.MessageAttachment(allBuffers[3], 'img4.png');
        // const attachment5 = new Discord.MessageAttachment(allBuffers[4], 'img5.png');
        // const attachment6 = new Discord.MessageAttachment(allBuffers[5], 'img6.png');
        // const attachment7 = new Discord.MessageAttachment(allBuffers[6], 'img7.png');
        // const attachment8 = new Discord.MessageAttachment(allBuffers[7], 'img8.png');

        // const embeds = [
        //     new Discord.MessageEmbed().setThumbnail('attachment://img.png').setTitle('Shell').setDescription('Useful item!').setFooter({ text: 'XP boost' }),
        //     new Discord.MessageEmbed().setThumbnail('attachment://img2.png').setTitle('Shell').setDescription('Useful item!').setFooter({ text: 'XP boost' }),
        //     new Discord.MessageEmbed().setThumbnail('attachment://img3.png').setTitle('Wings').setDescription('Useful item!').setFooter({ text: 'HP boost' }),
        //     new Discord.MessageEmbed().setThumbnail('attachment://img4.png').setTitle('Feather').setDescription('Useful item!').setFooter({ text: 'AP boost' }),
        //     new Discord.MessageEmbed().setThumbnail('attachment://img5.png').setTitle('Wings').setDescription('Useful item!').setFooter({ text: 'HP boost' }),
        //     new Discord.MessageEmbed().setThumbnail('attachment://img6.png').setTitle('Wings').setDescription('Useful item!').setFooter({ text: 'HP boost' }),
        //     new Discord.MessageEmbed().setThumbnail('attachment://img7.png').setTitle('Wings').setDescription('Useful item!').setFooter({ text: 'HP boost' }),
        //     new Discord.MessageEmbed().setThumbnail('attachment://img8.png').setTitle('Wings').setDescription('Useful item!').setFooter({ text: 'HP boost' }),

        // ];
        // await interaction.reply({ embeds, files: [attachment, attachment2, attachment3, attachment4, attachment5, attachment6, attachment7, attachment8] });




        // await interaction.reply({ content: `Hey **<@${ userId }>** let's get that cash!`, embeds: [embed], components: [row] })

        // let randomItem = 1;
        // // const file = new Discord.MessageAttachment(`/home/snapdeus/The-Butler/resources/rpgItems/${ randomItem }.png`);
        // const file = new Discord.MessageAttachment(`C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\${ randomItem }.png`);
        // collector.on('collect', async i => {

        //     if (i.user.id !== userId) {
        //         return await i.followUp({
        //             content: "This button is not for you",
        //             ephemeral: true
        //         })
        //     }

        //     //when you click the button, it adds the timestamp
        //     mongoUser.timestamp = Date.now()
        //     await mongoUser.save();
        //     //process the different buttons
        //     if (i.customId.startsWith("Blue")) {
        //         row.components[0].setDisabled(true)
        //         row.components[1].setDisabled(true);
        //         row.components[2].setDisabled(true);
        //         const embed = new Discord.MessageEmbed()
        //             .setFooter({ text: "Look who won some cash!*", iconURL: user.displayAvatarURL() })
        //             .setTitle(`***DAILY CASH!!!***`)
        //             .addField('Daily cash won:', `🪙${ (amount) }`)
        //             .addField(`Your total balance increased to: `, `🪙 ${ userRank.XPoverTime + amount }`)
        //             .setThumbnail(`attachment://${ randomItem }.png`)
        //         await interaction.editReply({ content: `**<@${ userId }>** you got that cash!`, embeds: [embed], components: [row], files: [file] })

        //         client.leveling.addXPoverTime(userId, guildId, amount)

        //         collector.stop()
        //         i.deferUpdate()
        //         return
        //     }
        //     if (i.customId.startsWith("Red")) {
        //         row.components[0].setDisabled(true)
        //         row.components[1].setDisabled(true);
        //         row.components[2].setDisabled(true);
        //         const embed = new Discord.MessageEmbed()
        //             .setFooter({ text: "Look who won some cash!*", iconURL: user.displayAvatarURL() })
        //             .setTitle(`***DAILY CASH!!!***`)
        //             .addField('Daily cash won:', `🪙${ (amount) }`)
        //             .addField(`Your total balance increased to: `, `🪙 ${ userRank.XPoverTime + amount }`)
        //         await interaction.editReply({ content: `**<@${ userId }>** you got that cash!`, embeds: [embed], components: [row] })

        //         client.leveling.addXPoverTime(userId, guildId, amount)

        //         collector.stop()
        //         i.deferUpdate()
        //         return
        //     }
        //     if (i.customId.startsWith("Green")) {
        //         row.components[0].setDisabled(true)
        //         row.components[1].setDisabled(true);
        //         row.components[2].setDisabled(true);
        //         const embed = new Discord.MessageEmbed()
        //             .setFooter({ text: "Look who won some cash!*", iconURL: user.displayAvatarURL() })
        //             .setTitle(`***DAILY CASH!!!***`)
        //             .addField('Daily cash won:', `🪙${ (amount) }`)
        //             .addField(`Your total balance increased to: `, `🪙 ${ userRank.XPoverTime + amount }`)
        //         await interaction.editReply({ content: `**<@${ userId }>** you got that cash!`, embeds: [embed], components: [row] })

        //         client.leveling.addXPoverTime(userId, guildId, amount)

        //         collector.stop()
        //         i.deferUpdate()
        //         return
        //     }
        //     if (i.customId.startsWith("Gray")) {
        //         row.components[0].setDisabled(true)
        //         row.components[1].setDisabled(true);
        //         row.components[2].setDisabled(true);
        //         const embed = new Discord.MessageEmbed()
        //             .setFooter({ text: "Look who won some cash!*", iconURL: user.displayAvatarURL() })
        //             .setTitle(`***DAILY CASH!!!***`)
        //             .addField('Daily cash won:', `🪙${ (amount) }`)
        //             .addField(`Your total balance increased to: `, `🪙 ${ userRank.XPoverTime + amount }`)
        //         await interaction.editReply({ content: `**<@${ userId }>** you got that cash!`, embeds: [embed], components: [row] })

        //         client.leveling.addXPoverTime(userId, guildId, amount)

        //         collector.stop()
        //         i.deferUpdate()
        //         return
        //     }





        //     i.deferUpdate()
        // });

        // setTimeout(function () {
        //     row.components[0].setDisabled(true);
        //     row.components[1].setDisabled(true);
        //     row.components[2].setDisabled(true);
        //     interaction.editReply({ components: [row] });
        // }, 120000);




    }
}