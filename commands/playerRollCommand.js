const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');
const Bag = require('../models/bag')
const { MessageActionRow, MessageButton } = require('discord.js');
const { botScore } = require('../utils/score');
const events = require('../src/events/events')
const { v4: uuidv4 } = require('uuid');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('playerrollscc')
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


        const mongoUser = await User.findOne({ userId: userId })

        const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
        const diceText = {
            1: '⚀',
            2: '⚁',
            3: '⚂',
            4: '⚃',
            5: '⚄',
            6: '⚅'
        }

        // console.log(rank)
        // console.log(playerDiceRoll)
        class Die {
            constructor (id) {
                this.id = id;
                this.currentRoll = 1;
                this.previousRoll = 1;
                this.isSelected = false;
            }
            roll = () => {
                this.previousRoll = this.currentRoll;
                this.currentRoll = getRandomRoll(1, 6)
            }
        }


        function getRandomRoll(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        let die1 = new Die(1);
        let die2 = new Die(2);
        let die3 = new Die(3);
        let die4 = new Die(4);
        let die5 = new Die(5);
        let diceArray = [die1, die2, die3, die4, die5]
        let cargo = 0;
        let numOfRolls = 0;
        let canHaveCargo = false;

        //returns an array of all dice that are not currently selected so they can be rolled.
        function getRollableDiceList() {
            let tempDiceList = [];
            for (let i = 0; i < diceArray.length; i++) {
                if (!diceArray[i].isSelected) {
                    tempDiceList.push(diceArray[i]);
                }
            }
            return tempDiceList;
        }
        // calls the roll function on each dice
        function rollDice(rollableDiceList) {
            for (let i = 0; i < rollableDiceList.length; i++) {
                rollableDiceList[i].roll();
            }
        }

        // returns an array of nonSelected Dice
        function getNonSelectedDice() {
            let tempArray = [];
            for (let i = 0; i < diceArray.length; i++) {
                if (!diceArray[i].isSelected) {
                    tempArray.push(diceArray[i]);
                }
                tempArray.sort(function (a, b) {
                    return b.currentRoll - a.currentRoll;
                });
            }
            return tempArray;
        }
        function getSelectedDice() {
            let selectedDice = [];
            for (let i = 0; i < diceArray.length; i++) {
                if (diceArray[i].isSelected) {
                    selectedDice.push(diceArray[i]);
                }
            }
            return selectedDice;
        }


        let shipExist = false;
        let captExist = false;
        let crewExist = false;
        //checks each dice for ship captain and crew. Auto select the first 6, 5 , 4.
        function checkForShipCaptCrew() {
            //array of dice that are not marked selected
            let nonSelectedDice = getNonSelectedDice();

            for (let i = 0; i < nonSelectedDice.length; i++) {
                //temp variable that represents the current dice in the list
                let currentDice = nonSelectedDice[i];

                if (!shipExist) {
                    if (currentDice.currentRoll == 6) {
                        shipExist = true;
                        currentDice.isSelected = true;
                    }
                }
                if (shipExist && !captExist) {
                    if (currentDice.currentRoll == 5) {
                        captExist = true;
                        currentDice.isSelected = true;
                    }
                }
                if (shipExist && captExist && !crewExist) {
                    if (currentDice.currentRoll == 4) {
                        crewExist = true;
                        currentDice.isSelected = true;
                        canHaveCargo = true;
                    }
                }
            }
        }



        const embed = new Discord.MessageEmbed()

        embed.setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        embed.setTitle(`${ username } is playing Ship, Captain & Crew!`)
        embed.setDescription(`${ username } is rolling!`)
        await interaction.reply({ embeds: [embed] })

        async function game() {


            let rollableDiceList = getRollableDiceList();

            //roll each dice
            rollDice(rollableDiceList);

            let nonSelectedDice = getNonSelectedDice();

            // //auto select first 6, 5, 4 (in that order)
            checkForShipCaptCrew();
            let selectedDice = getSelectedDice()

            // console.log("___________________", "\n", "this is the num roll: ", numOfRolls, "\n", nonSelectedDice,)

            let newDiceArray = []
            for (let dice of nonSelectedDice) {
                newDiceArray.push(dice.currentRoll)
            }
            let visRepOfDice = []
            for (die of newDiceArray) {
                visRepOfDice.push(diceText[die])
            }


            embed.addField(`Roll #${ numOfRolls + 1 }: `, `${ newDiceArray }\n${ visRepOfDice } `)
            await interaction.editReply({ embeds: [embed] });




            if (shipExist && !captExist) {
                embed.addField("Result", `You have <:ferry:982714449599299604>`)
                await interaction.editReply({ embeds: [embed] });
            }
            if (shipExist && captExist && !crewExist) {
                embed.addField("Result", `You have <:ferry:982714449599299604> and <:pilot:982714114730250260>`)
                await interaction.editReply({ embeds: [embed] });
            }
            if (shipExist && captExist && crewExist) {
                embed.addField("Result", `You have <:ferry:982714449599299604> and <:pilot:982714114730250260> and <:two_men_holding_hands:982714322365071390>`)
                await interaction.editReply({ embeds: [embed] });
            }



            if (numOfRolls < 1) {
                numOfRolls++;
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()

                            .setLabel('Roll again? (#2)')
                            .setStyle('PRIMARY')
                            .setCustomId(`2NDROLL_` + uuidv4() + interaction.user.id))

                if (canHaveCargo) {
                    nonSelectedDice = getNonSelectedDice();
                    cargo = nonSelectedDice[0].currentRoll + nonSelectedDice[1].currentRoll

                    mongoUser.my_cargo = parseInt(cargo);

                    embed.addField(`Your cargo:\n ${ diceText[nonSelectedDice[0].currentRoll] } + ${ diceText[nonSelectedDice[1].currentRoll] } =`, `${ cargo }`)
                    row.addComponents(
                        new MessageButton()

                            .setLabel('End Turn')
                            .setStyle('PRIMARY')
                            .setCustomId(`ENDTURNSCC_` + uuidv4() + interaction.user.id))
                }

                const filter = async i => i.customId.endsWith(interaction.user.id)
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

                collector.once('collect', async i => {
                    if (i.user.id === userId) {
                        row.components[0].setDisabled(true)
                        if (canHaveCargo) {
                            row.components[1].setDisabled(true)
                        }
                        await interaction.editReply({ components: [row] });
                    }
                    if (i.customId.startsWith('2NDROLL_')) {
                        console.log(i.customId)
                        i.deferUpdate();
                        return game()
                    }
                    if (i.customId.startsWith('ENDTURNSCC_')) {
                        await mongoUser.save()
                        console.log(i.customId)
                        i.deferUpdate();
                        return
                    }

                });
                await interaction.editReply({ embeds: [embed], components: [row], })
                setTimeout(function () {
                    row.components[0].setDisabled(true);
                    interaction.editReply({ components: [row] });
                }, 60000);

            } else if (numOfRolls === 1) {
                numOfRolls++;

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()

                            .setLabel('Roll Again? (#3)')
                            .setStyle('PRIMARY')
                            .setCustomId(`3RDROLL_` + uuidv4() + interaction.user.id)

                    );
                if (canHaveCargo) {
                    nonSelectedDice = getNonSelectedDice();
                    cargo = nonSelectedDice[0].currentRoll + nonSelectedDice[1].currentRoll;
                    mongoUser.my_cargo = parseInt(cargo);
                    embed.addField(`Your cargo:\n ${ diceText[nonSelectedDice[0].currentRoll] } + ${ diceText[nonSelectedDice[1].currentRoll] } =`, `${ cargo }`)
                    row.addComponents(
                        new MessageButton()

                            .setLabel('End Turn')
                            .setStyle('PRIMARY')
                            .setCustomId(`ENDTURNSCC_` + uuidv4() + interaction.user.id))
                }

                const filter = async i => i.customId.endsWith(interaction.user.id)
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

                collector.once('collect', async i => {
                    if (i.user.id === userId) {
                        row.components[0].setDisabled(true)
                        if (canHaveCargo) {
                            row.components[1].setDisabled(true)
                        }
                        await interaction.editReply({ components: [row] });
                    }
                    if (i.customId.startsWith('3RDROLL_')) {
                        console.log(i.customId)
                        i.deferUpdate();
                        return game()
                    }
                    if (i.customId.startsWith('ENDTURNSCC_')) {
                        await mongoUser.save()
                        console.log(i.customId)
                        i.deferUpdate();
                        return
                    }

                });
                await interaction.editReply({ embeds: [embed], components: [row], })
                setTimeout(async function () {
                    row.components[0].setDisabled(true);
                    await interaction.editReply({ components: [row] });
                }, 60000);


            } else if (!canHaveCargo && numOfRolls === 2) {
                numOfRolls++;
                mongoUser.my_cargo = 0;
                embed.addField(`You did not score any cargo`, "0")

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()

                            .setLabel('End Turn')
                            .setStyle('PRIMARY')
                            .setCustomId(`ENDTURNSCC_` + uuidv4() + interaction.user.id)

                    );
                const filter = async i => i.customId.endsWith(interaction.user.id)
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

                collector.once('collect', async i => {
                    await mongoUser.save()
                    console.log(i.customId)
                    i.deferUpdate();
                    if (i.user.id === userId) {
                        row.components[0].setDisabled(true)
                        await interaction.editReply({ components: [row] });
                    }
                    return
                });
                await interaction.editReply({ embeds: [embed], components: [row], })
                setTimeout(async function () {
                    row.components[0].setDisabled(true);
                    await interaction.editReply({ components: [row] });
                }, 60000);


            } else if (canHaveCargo && numOfRolls === 2) {
                nonSelectedDice = getNonSelectedDice();
                cargo = nonSelectedDice[0].currentRoll + nonSelectedDice[1].currentRoll
                mongoUser.my_cargo = parseInt(cargo);
                embed.addField(`Your cargo:\n ${ diceText[nonSelectedDice[0].currentRoll] } + ${ diceText[nonSelectedDice[1].currentRoll] } =`, `${ cargo }`)

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()

                            .setLabel('End Turn')
                            .setStyle('PRIMARY')
                            .setCustomId(`ENDTURNSCC_` + uuidv4() + interaction.user.id))
                const filter = async i => i.customId.endsWith(interaction.user.id)
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

                collector.once('collect', async i => {
                    if (i.user.id === userId) {
                        row.components[0].setDisabled(true)
                        await interaction.editReply({ components: [row] });
                    }
                    if (i.customId.startsWith('ENDTURNSCC_')) {
                        await mongoUser.save()
                        console.log(i.customId)
                        i.deferUpdate();
                        return
                    }
                });
                await interaction.editReply({ embeds: [embed], components: [row], })

            } else return

        }

        game()


    }
}