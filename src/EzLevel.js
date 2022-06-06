
const { EventEmitter } = require("events")
const events = require('./events/events.js')
const deleteModule = require('./deletedb.js')
const fs = require('fs')

const { playerStatus, botStatus } = require('../utils/status')

const User = require('../models/user')
const Bag = require('../models/bag')
const { botScore, playerScore } = require("../utils/score.js")
// const { mongo } = require('mongoose')
// const { time } = require('console')

class EasyLeveling extends EventEmitter {

    constructor (client, options) {
        super()
        if (!client) throw new Error('Easy Leveling Error: A valid discord client must be provided')
        if (!options) throw new Error('Easy Leveling Error: Options must be defined. Consinder reading readme.md')
        if (typeof options != 'object') throw new Error('Easy Leveling Error: Typeof options must be an object')
        // if(!options.startingXP || !options.startingLevel || !options.levelUpXP || !options.database) throw new Error('Easy Leveling Error: starting XP, starting Level or level up XP must be defined')
        this.client = client
        this.startingXP = options.startingXP || 0
        this.startingLevel = options.startingLevel || 1
        this.levelUpXP = options.levelUpXP || 100
        this.cooldown = options.cooldown || 1000
        this.diceCooldown = options.diceCooldown || 5000

        this.User = User
        this.Bag = Bag
    }

    async addLevels(userId, guildId, channelId, timestamp, username, author) {
        if (!userId) throw new Error('Easy Leveling Error: A valid user id must be provided')
        if (!guildId) throw new Error('Easy Level Error: A valid guild id must be provided')
        if (!channelId) throw new Error('Easy Level Error: A valid channel id must be provided')

        try {
            const mongoDbHasUser = await this.User.findOne({ userId: userId })

            if (!mongoDbHasUser) {
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
                    level: `${ this.startingLevel }`,
                    nextLevel: `${ this.levelUpXP }`
                })
                const bag = new Bag({
                    user: `${ user._id }`,
                })
                await bag.save()
                user.bag = bag;
                await user.save()
                return
            }


            //add xp

            mongoDbHasUser.xp += 1;
            mongoDbHasUser.xpOverTime += 1;
            // console.log(mongoDbHasUser)


            const userLevelUp = mongoDbHasUser.xp
            const curLevelUp = mongoDbHasUser.nextLevel

            //levelup
            if (userLevelUp === curLevelUp || userLevelUp > curLevelUp) {
                mongoDbHasUser.xp = 0;
                mongoDbHasUser.xpOverTime += 1
                mongoDbHasUser.level += 1;
                const newLevel = mongoDbHasUser.level;
                const nextLevel = (this.levelUpXP + 1) * (Math.pow(2, newLevel) - 1)
                mongoDbHasUser.nextLevel = nextLevel;
                const lastLevel = newLevel - 1
                await mongoDbHasUser.save()
                this.emit(events.UserLevelUpEvent, newLevel, lastLevel, userId, guildId, channelId, username, author)
                return
            }
            //cooldown
            // const lastMessage = mongoDbHasUser.timestamp

            // console.log(lastMessage)
            // console.log(Date.now())
            // if (lastMessage !== null && this.cooldown - (Date.now() - lastMessage) > 0) {
            //     console.log('cooldown active')
            //     this.emit(events.cooldownActive, channelId, userId)
            // }
            //add new timestamp
            // mongoDbHasUser.timestamp = timestamp;

            await mongoDbHasUser.save()
        } catch (error) {
            this.emit(events.error, error, 'addLevels')
        }
    }

    async getUserLevel(userId, guildId, username) {
        if (!userId) throw new Error('Easy Level Error: A valid user id must be provided')
        if (!guildId) throw new Error('Easy Level Error: A valid guild id must be provided')
        try {
            const mongoDbHasUser = await this.User.findOne({ userId: userId })
            if (!mongoDbHasUser) {
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
                    level: `${ this.startingLevel }`,
                    nextLevel: `${ this.levelUpXP }`
                })
                const bag = new Bag({
                    user: `${ user._id }`,
                })
                await bag.save()
                user.bag = bag;
                const data = {
                    level: user.level,
                    xp: user.xp,
                    nextLevel: user.nextLevel,
                    XPoverTime: user.xpOverTime,
                    dice_wins: user.dice_wins,
                    dice_losses: user.dice_losses,
                    dice_ties: user.dice_ties,
                }
                await user.save()
                return data

            }
            const data = {
                level: mongoDbHasUser.level,
                xp: mongoDbHasUser.xp,
                nextLevel: mongoDbHasUser.nextLevel,
                XPoverTime: mongoDbHasUser.xpOverTime,
                dice_wins: mongoDbHasUser.dice_wins,
                dice_losses: mongoDbHasUser.dice_losses,
                dice_ties: mongoDbHasUser.dice_ties,
            }
            return data
        } catch (error) {
            this.emit(events.error, error, 'getUserLevel')
        }
    }


    async setLevel(level, userId, guildId) {
        if (!level) throw new Error('Easy Level Error: A valid level must be provided')
        if (typeof level != "number") throw new SyntaxError('Easy Level Error: Type of level must be a number')
        if (!userId) throw new Error('Easy Level Error: A valid user id must be provided')
        if (!guildId) throw new Error('Easy Level Error: A valid guild id must be provided')
        try {
            await this.User.findOneAndUpdate({ userId: userId }, { level: level })

        } catch (error) {
            this.emit(events.error, error, 'setLevel')
        }
    }

    async setXP(xp, userId, guildId) {
        const mongoUser = await this.User.findOne({ userId: userId })

        const curLevelUp = mongoUser.nextLevel;

        if (xp < 0) throw new Error('Easy Level Error: A valid xp must be provided')
        if (typeof xp != 'number') throw new SyntaxError('Easy Level Error: Type of xp must be a number')
        if (xp > curLevelUp) throw new Error(`Easy Level Error: Amount of XP cannot be more than ${ curLevelUp }`)
        // if (xp < 0) throw new Error(`Easy Level Error: Amount of XP cannot be more than 0`)
        try {
            mongoUser.xp = xp;
            await mongoUser.save()

        } catch (error) {
            this.emit(events.error, error, 'setXP')
        }
    }
    // async getAllData() {
    //     try {
    //         const allData = this.db.all()
    //         return allData
    //     } catch (error) {
    //         this.emit(events.error, error, 'getAllData')
    //     }
    // }
    // async deleteAllData() {
    //     deleteModule.deleteAllData(this.db, this.dbName)
    // }

    // async deleteUserData(userId, guildId) {
    //     if (!userId) throw new Error('Easy Level Error: A valid user id must be provided!')
    //     if (!guildId) throw new Error('Easy Level Error: A valid user guild must be provided!')
    //     try {
    //         deleteModule.deleteUserData(userId, guildId, this.db)
    //     } catch (err) {
    //         this.emit(events.error, error, 'deleteUserData')
    //     }
    // }

    async addOneLevel(userId, guildId, amount) {
        if (!userId) throw new Error('Easy Level Error: A valid user id must be provided!')
        if (!guildId) throw new Error('Easy Level Error: A valid user guild must be provided!')
        if (!amount) throw new Error('Easy Level Error: An amount must be provided!')
        if (typeof amount != 'number') throw new Error("Easy Level TypeError: Type of 'amount' must be a number")
        try {
            const mongoUser = await this.User.findOne({ userId: userId })
            mongoUser.level += amount;
            mongoUser.xp = 0;
            await mongoUser.save()


        } catch (error) {
            this.emit(events.error, error, 'addOneLevel')
        }
    }

    async reduceLevels(userId, guildId, amount) {
        if (!userId) throw new Error('Easy Level Error: A valid user id must be provided!')
        if (!guildId) throw new Error('Easy Level Error: A valid user guild must be provided!')
        if (!amount) throw new Error('Easy Level Error: An amount must be provided!')
        if (typeof amount != 'number') throw new Error("Easy Level TypeError: Type of 'amount' must be a number")
        try {
            const mongoUser = await this.User.findOne({ userId: userId })
            mongoUser.level -= amount;
            await mongoUser.save()


        } catch (error) {
            this.emit(events.error, error, 'reduceLevels')
        }
    }


    async addXP(userId, guildId, amount) {
        if (!userId) throw new Error('Easy Level Error: A valid user id must be provided!')
        if (!guildId) throw new Error('Easy Level Error: A valid user guild must be provided!')
        if (!amount) throw new Error('Easy Level Error: An amount must be provided!')
        try {
            if (typeof amount != 'number') throw new Error("Easy Level TypeError: Type of 'amount' must be a number")
            const mongoUser = await this.User.findOne({ userId: userId })
            mongoUser.xp += amount;
            await mongoUser.save()

        } catch (error) {
            this.emit(events.error, error, 'addXP')
        }
    }
    async addXPoverTime(userId, guildId, amount) {
        if (!userId) throw new Error('Easy Level Error: A valid user id must be provided!')
        if (!guildId) throw new Error('Easy Level Error: A valid user guild must be provided!')
        if (!amount) throw new Error('Easy Level Error: An amount must be provided!')
        try {
            if (typeof amount != 'number') throw new Error("Easy Level TypeError: Type of 'amount' must be a number")

            const mongoUser = await this.User.findOne({ userId: userId })
            mongoUser.xpOverTime += amount;
            await mongoUser.save()

        } catch (error) {
            this.emit(events.error, error, 'addXPoverTime')
        }
    }
    async reduceXP(userId, guildId, amount) {
        if (!userId) throw new Error('Easy Level Error: A valid user id must be provided!')
        if (!guildId) throw new Error('Easy Level Error: A valid user guild must be provided!')
        if (!amount) throw new Error('Easy Level Error: An amount must be provided!')
        try {
            if (typeof amount != 'number') throw new Error("Easy Level TypeError: Type of 'amount' must be a number")
            const mongoUser = await this.User.findOne({ userId: userId })
            mongoUser.xp -= amount;
            await mongoUser.save()

        } catch (error) {
            this.emit(events.error, error, 'reduceXP')
        }
    }
    async reduceXPoverTime(userId, guildId, amount) {
        if (!userId) throw new Error('Easy Level Error: A valid user id must be provided!')
        if (!guildId) throw new Error('Easy Level Error: A valid user guild must be provided!')
        if (!amount) throw new Error('Easy Level Error: An amount must be provided!')
        try {
            if (typeof amount != 'number') throw new Error("Easy Level TypeError: Type of 'amount' must be a number")
            const mongoUser = await this.User.findOne({ userId: userId })
            mongoUser.xpOverTime -= amount;
            await mongoUser.save()

        } catch (error) {
            this.emit(events.error, error, 'reduceXP')
        }
    }
    async getTopUser(guildId) {
        if (!guildId) throw new Error('Easy level Error: guildId must be a valid discord guild')


        const allData = await this.User.find().sort({ level: -1, xp: -1 }).limit(5)
        // console.log(allData)
        const XPforGuild = []
        for (const key of allData) {
            if (String(key.guildId).includes(guildId)) {
                XPforGuild.push({
                    xpOverTime: key.xpOverTime,
                    userId: key.userId,
                    level: key.level,
                    xp: key.xp,
                    username: key.username
                })
            }
        }

        return XPforGuild
    }

    async rollDice(userId, guildId, username) {
        if (!userId) throw new Error('Easy Level Error: A valid user id must be provided!')
        if (!guildId) throw new Error('Easy Level Error: A valid user guild must be provided!')


        try {
            const mongoDbHasUser = await this.User.findOne({ userId: userId })
            if (!mongoDbHasUser) {
                const user = new User({
                    username: `${ username }`,
                    userId: `${ userId }`,
                    guildId: `${ guildId }`,
                    xp: 1,
                    xpOverTime: 1,
                    timestamp: null,
                    gameTimestamp: null,
                    level: `${ this.startingLevel }`,
                    nextLevel: `${ this.levelUpXP }`
                })
                const bag = new Bag({
                    user: `${ user._id }`,
                })
                await bag.save()
                user.bag = bag;
                await user.save()

            }

            const playerDiceRoll = Math.ceil((Math.random() * 6))
            const botDiceRoll = Math.ceil((Math.random() * 6))


            return { playerDiceRoll, botDiceRoll }
        } catch (error) {
            this.emit(events.error, error, 'rollDice')
        }
    }

    async rollShipCC(userId, guildId, username) {

        try {
            const mongoDbHasUser = await this.User.findOne({ userId: userId })
            if (!mongoDbHasUser) {
                const user = new User({
                    username: `${ username }`,
                    userId: `${ userId }`,
                    guildId: `${ guildId }`,
                    xp: 1,
                    xpOverTime: 1,
                    timestamp: null,
                    gameTimestamp: null,
                    level: `${ this.startingLevel }`,
                    nextLevel: `${ this.levelUpXP }`
                })
                const bag = new Bag({
                    user: `${ user._id }`,
                })
                await bag.save()
                user.bag = bag;
                await user.save()

            }



            return mongoDbHasUser
        } catch (error) {
            this.emit(events.error, error, 'shipcc')
        }
    }


}
module.exports = EasyLeveling