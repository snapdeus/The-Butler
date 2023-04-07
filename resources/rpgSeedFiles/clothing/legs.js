

const { countColors, mergeItemsCountsAndDescriptions } = require('../utils')


const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'legs');


const legs = require('../jsonSeedFiles/final.legs.json')

const countLegsColors = countColors(legs)


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