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


        const mongoUser = await client.leveling.rollShipCC(userId, guildId, username)

        const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

        const rank = await client.leveling.getUserLevel(userId, guildId, username)
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
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`${ username } is playing Ship, Captain & Crew!`)
            .setDescription(`The Butler will roll first `)

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



            embed.addField(`The ${ numOfRolls + 1 } roll was: `, `${ newDiceArray } `)
            interaction.editReply({ embeds: [embed] });


            if (shipExist && !captExist) {
                embed.addField("Result", `The Butler has <:ferry:982714449599299604>`)
                interaction.editReply({ embeds: [embed] });
            }
            if (shipExist && captExist && !crewExist) {
                embed.addField("Result", `The Butler has <:ferry:982714449599299604> and <:pilot:982714114730250260>`)
                interaction.editReply({ embeds: [embed] });
            }
            if (shipExist && captExist && crewExist) {
                embed.addField("Result", `The Butler has <:ferry:982714449599299604> and <:pilot:982714114730250260> and <:two_men_holding_hands:982714322365071390>`)
                interaction.editReply({ embeds: [embed] });
            }


            if (canHaveCargo) {
                // checkForShipCaptCrew();
                nonSelectedDice = getNonSelectedDice();
                cargo = nonSelectedDice[0].currentRoll + nonSelectedDice[1].currentRoll
                if (numOfRolls < 2 && cargo < 7) {
                    embed.addField(`There is some cargo on this roll but not enough for Butler: `, `${ cargo }`)
                    interaction.editReply({ embeds: [embed] });
                } else {
                    embed.addField(`The cargo score is `, `${ cargo }`)
                    interaction.editReply({ embeds: [embed] });
                }

                if (cargo >= 7) {
                    embed.addField(`The cargo was enough for Butler and was: `, `${ cargo }`)
                    interaction.editReply({ embeds: [embed] });
                    return
                }
            }

            if (!canHaveCargo && numOfRolls === 2) {
                embed.addField(`There was no cargo for Butler`, " :[ ")
                interaction.editReply({ embeds: [embed] });

            }




            numOfRolls++;


            // console.log(embed.fields)
            if (numOfRolls < 3) {
                return setTimeout(function () { game() }, 2500);

            }
            return
        }

        setTimeout(function () {
            game()
        }, 2500);







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
