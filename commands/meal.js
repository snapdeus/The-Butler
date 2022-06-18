
const { breads } = require('../resources/breads')
const Discord = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user')
const Bread = require('../models/bread')
const Bag = require('../models/bag')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('meal')
        .setDescription('eat a meal...gain a reward'),

    async execute(interaction) {

        const client = interaction.client
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id


        const mongoUser = await User.findOne({ userId: userId })
        if (mongoUser.xpOverTime < 100) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Insufficient Funds")
                .setColor("DARKER_GREY")
                .addField('You do not have: ', ` 100 Haus Coin\n Reminder...You need AT LEAST TWO FOOD ITEMS to have a meal! :D\n Tip: use /bag to see what you already have or /rank to see your level`)
                .addField(`Remaining Funds for ${ username }: `, `🪙 ${ mongoUser.xpOverTime } Haus Coin`)

            await interaction.reply({ embeds: [embed] })
            return
        }


        const nonObjectBag = await Bag.findOne({ user: mongoUser._id }, { "_id": 0, '__v': 0, 'user': 0 })
        const bag = nonObjectBag.toObject()






        let embed = new Discord.MessageEmbed()
        // console.log(bag)
        let mealPoints = 0;

        let haveMeal = false;

        Object.values(bag).forEach(val => {
            if (val.length !== 0) {
                mealPoints++
            }
        });
        let populatedBag = await Bag.findOne({ user: mongoUser._id })
            .populate({
                path: 'bread',
            }).populate('bread')
            .populate({
                path: 'dairy',
            }).populate('dairy')
            .populate({
                path: 'soup',
            }).populate('soup')
            .populate({
                path: 'pasta',
            }).populate('pasta')





        if (mealPoints >= 2) {
            haveMeal = true;
        }




        if (!haveMeal) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Not a full meal")
                .addField('You do enough food items', `Buy something with /bread, /soup, /pasta, /dairy\n You need AT LEAST FOOD TWO ITEMS to have a meal! :D\n Tip: use /bag to see what you already have or /rank to see your level`)
                .addField(`Remaining Funds for ${ username }: `, `🪙 ${ mongoUser.xpOverTime } Haus Coin`)

            await interaction.reply({ embeds: [embed] })
            return
        }


        let mealCategories = [];
        let bagArray = Object.entries(bag);
        let userMeal = {}

        for (let i = 0; i < bagArray.length; i++) {
            if (bagArray[i][1].length > 0) {
                mealCategories.push(bagArray[i][0])
            }
        }
        let reward = 0;
        let whatsForDinner = []
        for (let item of mealCategories) {
            userMeal[item] = bag[item][0];
            whatsForDinner.push(populatedBag[item][0])
            if (item === 'dairy') {
                reward = reward + 10
            } else if (item === 'bread') {
                reward = reward + 5
            } else if (item === 'pasta') {
                reward = reward + 15
            } else if ((item === 'soup')) {
                reward = reward + 20
            }
        }



        embed.setTitle('MEALTIME!');
        embed.addField(`${ username } IS EATING A MEAL!!!!`, `Account charged 🪙 100`);
        embed.setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        const mealsString = mealCategories.join(" and ")
        if (mealPoints === 2) {
            embed.addField("TWO COURSE MEAL", `You've had a meal of ${ mealsString }`);

        } else if (mealPoints === 3) {
            embed.addField("THREE COURSE MEAL!", `Bonus multiplier is x3\n You've had a meal of ${ mealsString }`);
            reward = reward * 2;
        } else if (mealPoints === 4) {
            reward = reward * 3;
            embed.addField("FOUR COURSE MEAL!", `Bonus multiplier is x4\n You've had a meal of ${ mealsString }`);
        }

        for (let dish of whatsForDinner) {

            embed.addField(`${ dish.name }`, `${ dish.description }`)
        }


        // embed.addField('Origin: ', `${ bread.origin }`)






        let xpStakes = reward;
        let curLevelUp = mongoUser.nextLevel;
        let nextLevel;
        //db logic



        if (mongoUser.xp + xpStakes > curLevelUp) {
            let difference = (mongoUser.xp + xpStakes) - curLevelUp
            mongoUser.level += 1;
            nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
            embed.addField("Level up!", `↗️↗️↗️`)
            if (difference > nextLevel) {
                mongoUser.level += 1;
                difference = difference - nextLevel;
                nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
                embed.addField("Level up!", `↗️↗️↗️`)
                if (difference > nextLevel) {
                    mongoUser.level += 1;
                    difference = difference - nextLevel;
                    nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
                    embed.addField("Level up!", `↗️↗️↗️`)
                    if (difference > nextLevel) {
                        mongoUser.level += 1;
                        difference = difference - nextLevel;
                        nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
                        embed.addField("Level up!", `↗️↗️↗️`)
                        if (difference > nextLevel) {
                            mongoUser.level += 1;
                            difference = difference - nextLevel;
                            nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
                            embed.addField("Level up!", `↗️↗️↗️`)
                            if (difference > nextLevel) {
                                mongoUser.level += 1;
                                difference = difference - nextLevel;
                                nextLevel = 10 * (Math.pow(2, mongoUser.level) - 1)
                                embed.addField("Level up!", `↗️↗️↗️`)
                            }
                        }
                    }
                }
            }
            mongoUser.xp = difference;
            mongoUser.nextLevel = nextLevel;

            embed.addField("Congratulations!", `You gained ${ xpStakes } XP!\n---\n${ username } is now\nLevel: ${ mongoUser.level }\n XP: ${ mongoUser.xp }`)

            //just gain xp
        } else {
            mongoUser.xp += xpStakes;
            embed.addField("Good job!", `You gained ${ xpStakes } XP!\n---\n${ username } is\nLevel: ${ mongoUser.level }\n XP: ${ mongoUser.xp }`)
        }



        embed.addField(`Remaining Funds for ${ username }: `, `🪙 ${ mongoUser.xpOverTime - 100 } Haus Coin`)
        await interaction.reply({ embeds: [embed] })



        await mongoUser.save()
        await User.findOneAndUpdate({ userId: userId }, { $inc: { xpOverTime: -100 } })

        let mealArray = Object.entries(userMeal);

        for (let m of mealArray) {
            let mealCategory = m[0];
            id = m[1];
            let update = {
                [mealCategory]: id
            }
            await Bag.findOneAndUpdate({ user: mongoUser._id }, { $pull: update })
        }



    }
}

