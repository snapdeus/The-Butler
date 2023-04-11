const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user')
const { msToTime } = require('../utils/math')
const path = require('path')
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









        let mongoUser = await User.findOne({ userId: userId })
        let timestamp = mongoUser.timestamp
        // // const timeLimit = 86400000
        const timeLimit = 864

        // //check date to see if you can use daily
        const thedate = Date.now()
        const timeDate = new Date(thedate)
        const timeWaited = timeDate - timestamp

        if (timeWaited < timeLimit) {
            const timeLeft = msToTime(timeLimit - timeWaited)


            return await interaction.reply({
                content: `You must wait ${ timeLeft } to use this command again \n\nYaaawn...it's ${ timeDate.toLocaleTimeString() } here! What's that mean?`,

            })



        }


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

        const { createCanvas } = require('canvas');
        const width = 256
        const height = 256
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');



        const imagesPath = path.join(__dirname, '..', 'resources', 'rpgItems')
        console.log(imagesPath)
        const torso = `${ imagesPath }/clothing/torso/aqua/0001_clothing_torso_aqua.png`;
        const head = `${ imagesPath }/clothing/head/black/0001_clothing_head_black.png`;
        const feet = `${ imagesPath }/clothing/feet/black/0001_clothing_feet_black.png`;
        const legs = `${ imagesPath }/clothing/legs/black/0001_clothing_legs_black.png`;
        const potion1 = `${ imagesPath }/potions/0001_potions.png`;
        const scroll1 = `${ imagesPath }/scrolls/0001_scrolls.png`

        const fakeUser = {
            name: 'John',
            HP: 50, // assume user has 100 max HP
            AP: 75,
            End: 20,
            Bag: {
                clothing2: {
                    Head: head
                },
                clothing: {
                    Torso: torso,

                },
                clothing3: {
                    Legs: legs,

                },
                clothing4: {
                    Feet: feet,

                },
                potions: {
                    slot1: potion1
                },
                scrolls: {
                    slot1: scroll1
                }
            }
        };

        // Calculate width of HP bar based on user's HP
        const hpWidth = (fakeUser.HP / 100) * width;
        const apWidth = (fakeUser.AP / 100) * width;
        const endWidth = (fakeUser.End / 100) * width
        //draw white background
        // ctx.fillStyle = '#fff';
        // ctx.fillRect(0, 0, width, height);

        function drawStatsBar(ctx, color, x, y, width, height) {
            // Draw darker bar representing full stat
            ctx.fillStyle = color.dark;
            ctx.fillRect(x, y, width, height);
            // Draw lighter bar representing user's stat
            ctx.fillStyle = color.light;
            ctx.fillRect(x, y, color.stat, height);
        }
        const colors = {
            hp: {
                stat: hpWidth,
                dark: '#112280',
                light: '#b3bef8'
            },
            ap: {
                stat: apWidth,
                dark: '#4f0a0a',
                light: '#d06969'
            },
            end: {
                stat: endWidth,
                dark: '#224d08',
                light: '#81b85f'
            }
        };

        // Draw bars
        drawStatsBar(ctx, colors.hp, 0, 0, 256, 10);
        drawStatsBar(ctx, colors.ap, 0, 10, 256, 10);
        drawStatsBar(ctx, colors.end, 0, 20, 256, 10);
        const categoryPositions = [
            { x: 113, y: 70 },
            { x: 103, y: 103 },
            { x: 103, y: 153 },
            { x: 100, y: 205 },
            { x: 0, y: 231 },
            { x: 231, y: 231 }
        ];

        const categorySizes = [
            { count: 0, width: 40, height: 40 },
            { count: 1, width: 60, height: 60 },
            { count: 2, width: 60, height: 60 },
            { count: 3, width: 45, height: 45 },
            { count: 4, width: 25, height: 25 },
            { count: 5, width: 25, height: 25 }
        ];


        function loadImageAndDraw(x, y, imagePath) {
            const image = loadImage(imagePath);
            ctx.drawImage(image, x, y, 12, 12);
        }

        const bagArray = [
            fakeUser.Bag.clothing2.Head,
            fakeUser.Bag.clothing.Torso,
            fakeUser.Bag.clothing3.Legs,
            fakeUser.Bag.clothing4.Feet,
            fakeUser.Bag.potions.slot1,
            fakeUser.Bag.scrolls.slot1
        ]

        // for (let item of bagArray) {
        //     let a = [50, 125, 200]
        //     const image = await loadImage(item);
        //     ctx.drawImage(image, a[bagArray.indexOf(item)], a[bagArray.indexOf(item)], 25, 25);

        // }
        let x = 0;
        let y, size;
        for (let [category, items] of Object.entries(fakeUser.Bag)) {
            let categoryIndex = Object.keys(fakeUser.Bag).indexOf(category);


            x = categoryPositions[categoryIndex].x;
            y = categoryPositions[categoryIndex].y;
            size = categorySizes[categoryIndex]

            for (let [itemSlot, item] of Object.entries(items)) {
                const image = await loadImage(item);
                ctx.drawImage(image, x, y, size.width, size.height);
                console.log(x)
            }
        }


        const buffer = canvas.toBuffer('image/png');
        const attachment = new Discord.MessageAttachment(buffer, 'img.png');

        const embeds = [
            new Discord.MessageEmbed().setImage('attachment://img.png').setTitle('Gear').setDescription('Equipment').setFooter({ text: 'Potions                                                          Scrolls' }),


        ];


        await interaction.reply({ embeds, files: [attachment] });




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