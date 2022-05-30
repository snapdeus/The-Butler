const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
const BagSchema = new Schema({
    bread: [
        {
            type: Schema.Types.ObjectId,
            ref: "Bread"
        }
    ],
    dairy: [
        {
            type: Schema.Types.ObjectId,
            ref: "Dairy"
        }
    ],
    soup: [
        {
            type: Schema.Types.ObjectId,
            ref: "Soup"
        }
    ],
    pasta: [
        {
            type: Schema.Types.ObjectId,
            ref: "Pasta"
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, opts)

module.exports = mongoose.model('Bag', BagSchema)