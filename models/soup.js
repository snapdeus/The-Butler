const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SoupSchema = new Schema({
    name: String,
    image: String,
    origin: String,
    description: String
});



module.exports = mongoose.model('Soup', SoupSchema)