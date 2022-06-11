const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');
const Bag = require('../models/bag')
const { MessageActionRow, MessageButton } = require('discord.js');
const { botScore } = require('../utils/score');
const events = require('../src/events/events')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const path = require('path')


const commandsPath = path.resolve(__dirname, '../commands');

const commandFiles = fs.readdirSync(`${ commandsPath }`).filter(file => file.endsWith('.js'));



module.exports = {
    data: new SlashCommandBuilder()
        .setName('zzzbotscc')
        .setDescription('Not a usable command'),
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

        client.commands = new Discord.Collection();
        for (const file of commandFiles) {
            const command = require(`${ commandsPath }/${ file }`);
            // set a new item in the Collection
            // with the key as the command name and the value as the exported module
            client.commands.set(command.data.name, command);
        }



        let mongoUser = await User.findOne({ userId: userId })

        const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
        const diceText = {
            1: '⚀',
            2: '⚁',
            3: '⚂',
            4: '⚃',
            5: '⚄',
            6: '⚅'
        }


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
            .setTitle(`${ username } vs. The Butler\nShip, Captain & Crew!`)
            .setDescription(`The Butler is rolling!`)


        await interaction.reply({ embeds: [embed], ephemeral: true })



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
                embed.addField("Result", `The Butler has <:ferry:982714449599299604>`)
                await interaction.editReply({ embeds: [embed] });
            }
            if (shipExist && captExist && !crewExist) {
                embed.addField("Result", `The Butler has <:ferry:982714449599299604> and <:pilot:982714114730250260>`)
                await interaction.editReply({ embeds: [embed] });
            }
            if (shipExist && captExist && crewExist) {
                embed.addField("Result", `The Butler has <:ferry:982714449599299604> and <:pilot:982714114730250260> and <:two_men_holding_hands:982714322365071390>`)
                await interaction.editReply({ embeds: [embed] });
            }


            // CARGO CHECK

            if (canHaveCargo) {
                // checkForShipCaptCrew();
                nonSelectedDice = getNonSelectedDice();
                cargo = nonSelectedDice[0].currentRoll + nonSelectedDice[1].currentRoll


                if (numOfRolls < 1 && cargo < 8) {
                    numOfRolls++;
                    embed.addField(`Cargo Score:`, `${ diceText[nonSelectedDice[0].currentRoll] } + ${ diceText[nonSelectedDice[1].currentRoll] } =\n ${ cargo }`)
                    embed.addField("Not a high enough cargo score!", 'The Butler will roll again!')
                    await interaction.editReply({ embeds: [embed] });
                    return setTimeout(function () { game() }, 2000);
                }
                if (numOfRolls < 2 && cargo < 6) {
                    embed.addField(`Cargo Score`, `${ diceText[nonSelectedDice[0].currentRoll] } + ${ diceText[nonSelectedDice[1].currentRoll] } =\n ${ cargo }`)
                    embed.addField("Not a high enough cargo score!", 'The Butler will roll again!')
                    await interaction.editReply({ embeds: [embed] });
                }


                if (numOfRolls === 2 || cargo >= 6) {
                    mongoUser.bot_cargo = parseInt(cargo);
                    await mongoUser.save();
                    embed.addField(`The Butler's final cargo score`, `${ diceText[nonSelectedDice[0].currentRoll] } + ${ diceText[nonSelectedDice[1].currentRoll] } =\n ${ cargo }`)
                    //BUTTON STUFF
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()

                                .setLabel('PLAYER ROLL ')
                                .setStyle('PRIMARY')
                                .setCustomId(`PLAYSCC_` + uuidv4() + interaction.user.id)

                        );
                    const filter = async i => i.customId.endsWith(interaction.user.id)
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

                    collector.on('collect', async i => {
                        if (i.user.id === userId) {
                            row.components[0].setDisabled(true)
                            await interaction.editReply({ components: [row] });
                        }
                        if (i.customId.startsWith('PLAYSCC_')) {
                            collector.stop()
                            return
                        }
                    });
                    collector.on('end', async i => {
                        let checkUser = await User.findOne({ userId: userId })
                        if (checkUser.is_playing_scc) {
                            mongoUser.my_cargo = 0;
                            await mongoUser.save();
                            const command = client.commands.get('zzzendscc')
                            await command.execute(interaction)
                        }
                        // console.log('ended')
                    })

                    await interaction.editReply({ embeds: [embed], components: [row], })
                    setTimeout(async function () {

                        row.components[0].setDisabled(true);
                        await interaction.editReply({ components: [row] });

                    }, 60000);


                    return
                }
            }

            //NO CARGO :[
            if (!canHaveCargo && numOfRolls === 2) {
                mongoUser.bot_cargo = 0;
                await mongoUser.save();
                embed.addField(`There was no cargo for Butler`, '0')
                await interaction.editReply({ embeds: [embed] });

            }

            //INCREMENT ROLL
            numOfRolls++;


            if (numOfRolls < 3) {
                return setTimeout(function () { game() }, 2000);
            } else {
                //ADD BUTTON
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()

                            .setLabel('PLAYER ROLL')
                            .setStyle('PRIMARY')
                            .setCustomId(`PLAYSCC_` + uuidv4() + interaction.user.id)

                    );
                const filter = async i => i.customId.endsWith(interaction.user.id)
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

                collector.on('collect', async i => {
                    // console.log(i)
                    // console.log(i.customId)

                    if (i.user.id === userId) {

                        row.components[0].setDisabled(true)
                        await interaction.editReply({ components: [row] });
                    }
                    if (i.customId.startsWith('PLAYSCC_')) {
                        collector.stop()
                        return
                    }

                });
                collector.on('end', async i => {
                    let checkUser = await User.findOne({ userId: userId })
                    if (checkUser.is_playing_scc) {
                        mongoUser.my_cargo = 0;
                        await mongoUser.save();
                        const command = client.commands.get('zzzendscc')
                        await command.execute(interaction)
                    }
                    // console.log('ended')
                })

                await interaction.editReply({ embeds: [embed], components: [row], })

                setTimeout(async function () {

                    row.components[0].setDisabled(true);
                    await interaction.editReply({ components: [row] });

                }, 60000);
            }

            //IMPORTANT RETURN OUT OF GAME, ENDS GAME
            return
        }
        //RUN GAME
        setTimeout(function () { game() }, 2000);
    }
}