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
    dice_wins: Number,
    dice_losses: Number,
    dice_ties: Number,
    my_cargo: Number,
    bot_cargo: Number,
    my_scc_wager: Number,
    scc_wins: Number,
    scc_losses: Number,
    scc_ties: Number,
    bag: {
        type: Schema.Types.ObjectId,
        ref: 'Bag'
    },

}, opts)

module.exports = mongoose.model('User', UserSchema)