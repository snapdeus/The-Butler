const Discord = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders');
const { breads } = require('../resources/breads')
const { dairy } = require('../resources/dairy')

const Bag = require('../models/bag')
const User = require('../models/user')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bag')
        .setDescription('displays bag'),


    async execute(interaction) {
        const client = interaction.client
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id


        const mongoUser = await User.findOne({ userId: userId })
        if (!mongoUser) {
            const user = new User({
                username: `${ username }`,
                userId: `${ userId }`,
                guildId: `${ guildId }`,
                xp: 1,
                xpOverTime: 1,
                timestamp: null,
                gameTimestamp: null,
                dice_wins: 0,
                dice_losses: 0,
                dice_ties: 0,
                level: `${ 1 }`,
                nextLevel: `${ 9 }`
            })
            const bag = new Bag({
                user: `${ user._id }`,
            })
            await bag.save()
            user.bag = bag;
            await user.save()
            return await interaction.reply(`Generating your bag. Use command again.`)
        }






        const bag = await Bag.findOne({ user: mongoUser._id })



        const populatedBag = await Bag.findOne({ user: mongoUser._id })
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




        const breadsInBag = populatedBag.bread;
        const dairyInBag = populatedBag.dairy;
        const soupInBag = populatedBag.soup;
        const pastaInBag = populatedBag.pasta

        //USEFUL FILTER, BUT NOT USEFUL ANYMORE
        // const filterObjectArray = (arr, filterArr) => (
        //     arr.filter(el =>
        //         filterArr.some(f =>

        //             f === el.breadId

        //         )
        //     )
        // );

        // const dfilterObjectArray = (arr, filterArr) => (
        //     arr.filter(el =>
        //         filterArr.some(f =>
        //             f === el.dairyId
        //         )
        //     )
        // );
        // const breadsInBag = filterObjectArray(breads, userBreadBag)
        // const dairyInBag = dfilterObjectArray(dairy, userDairyBag)

        let breadsString = ''
        let breadArray = [];
        for (let bread of breadsInBag) {
            breadArray.push(bread.name)

        }

        let dairyString = ''
        let dairyArray = [];
        for (let dairy of dairyInBag) {
            dairyArray.push(dairy.name)

        }

        let soupString = ''
        let soupArray = [];
        for (let soup of soupInBag) {
            soupArray.push(soup.name)

        }
        let pastaString = ''
        let pastaArray = [];
        for (let pasta of pastaInBag) {
            pastaArray.push(pasta.name)

        }





        breadsString = breadArray.join(', ')
        dairyString = dairyArray.join(', ')
        soupString = soupArray.join(', ')
        pastaString = pastaArray.join(', ')
        // console.log(breadsString)
        // console.log(dairyString)

        const embed = new Discord.MessageEmbed()
            .setThumbnail('https://i.imgur.com/hAnfQUZ.png')
            .setTitle(`${ username }'s Bag`)
            .setFooter({ text: `Current Balance: 🪙 ${ mongoUser.xpOverTime }`, iconURL: interaction.user.displayAvatarURL() })
        if (breadArray.length !== 0) {
            embed.addField('Breads: ', `${ breadsString }`)
        }

        if (dairyArray.length !== 0) {
            embed.addField('Dairy: ', `${ dairyString }`)
        }
        if (soupArray.length !== 0) {
            embed.addField('Soup: ', `${ soupString }`)
        }
        if (pastaArray.length !== 0) {
            embed.addField('Pasta: ', `${ pastaString }`)
        }
        await interaction.reply({ embeds: [embed] })



    }
}

