

const { countColors, mergeItemsCountsAndDescriptions, read_directory } = require('../utils')


const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'legs');


// read_directory(dir).then(data => {
//     fs.writeFileSync('./jsonSeedFiles/final.legs.json', JSON.stringify(data));
// });

const legs = require('./jsonSeedFiles/final.legs.json')

const countLegsColors = countColors(legs)
console.log(countLegsColors)

const totalLegs = legs.length


const legsMetaInfo = {
    totalLegs,
    legsCounts: countLegsColors
};


const legsDescripObj = {
    Black: "Black",
    Blue: "Blue",
    Green: "Green",
    Orange: "Orange",
    Pink: "Pink",
    Purple: "Purple",
    Red: "Red",
    White: "White"
};

legsMetaInfo.legsCounts = mergeItemsCountsAndDescriptions(legsMetaInfo.legsCounts, legsDescripObj);
module.exports = {
    legs,
    legsMetaInfo
};