

const { countColors, mergeItemsCountsAndDescriptions } = require('../utils')


const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'feet');



const feet = require('../jsonSeedFiles/final.feet.json')

const countFeetColors = countColors(feet)

const totalFeet = feet.length

const feetMetaInfo = {
    totalFeet,
    feetCounts: countFeetColors
};


const feetDescripObj = {
    Black: "Black",
    Blue: "Blue",
    Brown: "Brown",
    Green: "Green",
    Orange: "Orange",
    Yellow: "Yellow",
    Purple: "Purple",
    Red: "Red",
    White: "White"
};

feetMetaInfo.feetCounts = mergeItemsCountsAndDescriptions(feetMetaInfo.feetCounts, feetDescripObj);
module.exports = {
    feet,
    feetMetaInfo
};