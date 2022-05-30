const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BreadSchema = new Schema({
    name: String,
    image: String,
    type: String,
    origin: String,
    description: String
});



module.exports = mongoose.model('Bread', BreadSchema)