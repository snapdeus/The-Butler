

const { countColors, mergeItemsCountsAndDescriptions } = require('../utils')


const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'hands');



const hands = require('../jsonSeedFiles/final.hands.json')

const countHandsColors = countColors(hands)

const totalHands = hands.length

const handsMetaInfo = {
    totalHands,
    data: countHandsColors
};


const handsDescripObj = {
    Black: "Black",
    Blue: "Blue",
    Green: "Green",
    Orange: "Orange",
    Pink: "Pink",
    Purple: "Purple",
    Red: "Red",
    White: "White",
    Yellow: "Yellow",
};

handsMetaInfo.data = mergeItemsCountsAndDescriptions(handsMetaInfo.data, handsDescripObj);

// const testingArray = Object.entries(handsMetaInfo.handsCounts).map(e => e[1])
// for (testObject of testingArray) {
//     console.log(testObject.count.count, testObject.count.Filename)
//     if (testObject.count.count !== testObject.count.FilenameCount) {
//         throw new Error("Count mismatch!")
//     }
// }

module.exports = {
    hands,
    handsMetaInfo
};