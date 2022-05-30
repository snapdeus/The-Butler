const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PastaSchema = new Schema({
    name: String,
    image: String,
    origin: String,
    description: String,
    translation: String,
    origin: String,
});



module.exports = mongoose.model('Pasta', PastaSchema)