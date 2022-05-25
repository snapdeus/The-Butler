const Discord = require('discord.js')
const db = require('quick.db')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { breads } = require('../resources/breads')
const { dairy } = require('../resources/dairy')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bag')
        .setDescription('displays bag'),


    async execute(interaction) {
        const client = interaction.client
        let userId = interaction.user.id
        let username = interaction.user.username
        let guildId = interaction.guild.id

        const bag = new db.table('bag')
        const dbHasBag = bag.has(`${ userId }`)
        if (!dbHasBag) {
            bag.set(`${ userId }.bread`, [])
        }

        const hasDairy = bag.has(`${ userId }.dairy`)
        if (!hasDairy) {
            bag.set(`${ userId }.dairy`, [])
        }
        console.log(hasDairy)
        const userBreadBag = bag.get(`${ userId }.bread`)
        const userDairyBag = bag.get(`${ userId }.dairy`)

        const filterObjectArray = (arr, filterArr) => (
            arr.filter(el =>
                filterArr.some(f =>

                    f === el.breadId

                )
            )
        );

        const dfilterObjectArray = (arr, filterArr) => (
            arr.filter(el =>
                filterArr.some(f =>
                    f === el.dairyId
                )
            )
        );

        const breadsInBag = filterObjectArray(breads, userBreadBag)
        const dairyInBag = dfilterObjectArray(dairy, userDairyBag)

        let breadsString = ''
        let breadArray = [];
        for (let bread of breadsInBag) {
            breadArray.push(bread.Name)

        }

        let dairyString = ''
        let dairyArray = [];
        for (let dairy of dairyInBag) {
            dairyArray.push(dairy.Name)

        }



        let rank = await client.leveling.getUserLevel(userId, guildId, username)


        breadsString = breadArray.join(', ')
        dairyString = dairyArray.join(', ')

        console.log(breadsString)
        console.log(dairyString)

        const embed = new Discord.MessageEmbed()
            .setThumbnail('https://i.imgur.com/hAnfQUZ.png')
            .setTitle(`${ username }'s Bag`)
            .setFooter({ text: `Current Balance: 🪙 ${ rank.XPoverTime }`, iconURL: interaction.user.displayAvatarURL() })
        if (breadArray.length !== 0) {
            embed.addField('Breads: ', `${ breadsString }`)
        }

        if (dairyArray.length !== 0) {
            embed.addField('Dairy: ', `${ dairyString }`)
        }

        await interaction.reply({ embeds: [embed] })



    }
}

