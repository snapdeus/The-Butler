

const { countColors, mergeItemsCountsAndDescriptions } = require('../utils')


const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'hands');



const hands = require('../jsonSeedFiles/final.hands.json')

const countHandsColors = countColors(hands)

const totalHands = hands.length

const handsMetaInfo = {
    totalHands,
    handsCounts: countHandsColors
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

handsMetaInfo.handsCounts = mergeItemsCountsAndDescriptions(handsMetaInfo.handsCounts, handsDescripObj);
module.exports = {
    hands,
    handsMetaInfo
};