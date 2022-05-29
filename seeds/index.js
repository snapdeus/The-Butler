require('dotenv').config();
const mongoose = require('mongoose')

const Bread = require('../models/bread')
const Dairy = require('../models/dairy')
const User = require('../models/user')
const Soup = require('../models/soup')
const { breads } = require('../resources/breads')
const { dairies } = require('../resources/dairy')
const { users } = require('../resources/fakeUsers')
const { soups } = require('../resources/soups')


mongoose.connect(`mongodb://localhost:27017/butler-db?authSource=butler-db`, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PW,
    autoIndex: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});


const seedBread = async () => {
    await Bread.deleteMany({});
    for (let i = 0; i < breads.length; i++) {
        const bread = new Bread({
            name: `${ breads[i].Name }`,
            image: `${ breads[i].Image }`,
            type: `${ breads[i].Type }`,
            origin: `${ breads[i].Origin }`,
            description: `${ breads[i].Description }`,
        })
        await bread.save()
    }
}

// seedBread().then(() => {
//     mongoose.connection.close();
// });

const seedDairy = async () => {

    await Dairy.deleteMany({});
    for (let i = 0; i < dairies.length; i++) {
        const dairy = new Dairy({
            name: `${ dairies[i].Name }`,
            image: `${ dairies[i].Image }`,
            origin: `${ dairies[i].Origin }`,
            description: `${ dairies[i].Description }`,
        })
        await dairy.save()
    }
}

// seedDairy().then(() => {
//     mongoose.connection.close();
// });

const seedUsers = async () => {

    await User.deleteMany({});
    for (let i = 0; i < users.length; i++) {
        const user = new User({
            username: `${ users[i].username }`,
            userId: `${ users[i].userId }`,
            guildId: `${ users[i].guildId }`,
            xp: `${ users[i].xp }`,
            xpOverTime: `${ users[i].xpOverTime }`,
            level: `${ users[i].level }`,
            nextLevel: `${ users[i].nextLevel }`,
            timestamp: `${ users[i].timestamp }`,
            gameTimestamp: `${ users[i].gameTimestamp }`
        })
        await user.save()
    }
}



// seedUsers().then(() => {
//     mongoose.connection.close();
// });

const testFOAU = async () => {
    await User.findOneAndUpdate({ userId: '816689ad964868137216' }, { username: 'ben shapiro' })


}

// testFOAU().then(() => {
//     mongoose.connection.close();
// });


const seedSoup = async () => {

    await Soup.deleteMany({});
    for (let i = 0; i < soups.length; i++) {
        const soup = new Soup({
            name: `${ soups[i].Name }`,
            image: `${ soups[i].Image }`,
            origin: `${ soups[i].Origin }`,
            description: `${ soups[i].Description }`,
        })
        await soup.save()
    }
}

seedSoup().then(() => {
    mongoose.connection.close();
});