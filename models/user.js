const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const UserSchema = new Schema({
    username: String,
    userId: String,
    guildId: String,
    xp: Number,
    xpOverTime: Number,
    level: Number,
    nextLevel: Number,
    timestamp: String,
    gameTimestamp: String,
    bag: {
        type: Schema.Types.ObjectId,
        ref: 'Bag'
    },

}, opts)



module.exports = mongoose.model('User', UserSchema)