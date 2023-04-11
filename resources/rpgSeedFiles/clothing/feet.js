

const { countColors, mergeItemsCountsAndDescriptions } = require('../utils')


const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'feet');



const feet = require('../jsonSeedFiles/final.feet.json')
const config = {
    type: "Feet"
}
const countFeetColors = countColors(feet, config)

const totalFeet = feet.length

const feetMetaInfo = {
    totalFeet,
    data: countFeetColors
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

feetMetaInfo.data = mergeItemsCountsAndDescriptions(feetMetaInfo.data, feetDescripObj);
module.exports = {
    feet,
    feetMetaInfo
};