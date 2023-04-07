

const { countColors, mergeItemsCountsAndDescriptions, read_directory } = require('../utils')


const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'feet');


// read_directory(dir).then(data => {
//     fs.writeFileSync('./jsonSeedFiles/final.feet.json', JSON.stringify(data));
// });

const feet = require('./jsonSeedFiles/final.feet.json')

const countFeetColors = countColors(feet)

const totalFeet = feet.length

const feetMetaInfo = {
    totalFeet,
    feetCounts: countFeetColors
};


const feetDescripObj = {
    Aqua: "Aqua",
    Blue: "Blue",
    Green: "Green",
    Orange: "Orange",
    Pink: "Pink",
    Purple: "Purple",
    Red: "Red",
    White: "White"
};

feetMetaInfo.feetCounts = mergeItemsCountsAndDescriptions(feetMetaInfo.feetCounts, feetDescripObj);
module.exports = {
    feet,
    feetMetaInfo
};