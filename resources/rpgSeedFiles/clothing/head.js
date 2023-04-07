

const { countColors, mergeItemsCountsAndDescriptions } = require('../utils')


const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'head');


const head = require('../jsonSeedFiles/final.head.json')

const countHeadColors = countColors(head)


const totalHead = head.length


const headMetaInfo = {
    totalHead,
    headCounts: countHeadColors
};


const headDescripObj = {
    Black: "Black",
    Blue: "Blue",
    Green: "Green",
    Orange: "Orange",
    Yellow: "Yellow",
    Purple: "Purple",
    Red: "Red",
    White: "White"
};

headMetaInfo.headCounts = mergeItemsCountsAndDescriptions(headMetaInfo.headCounts, headDescripObj);
module.exports = {
    head,
    headMetaInfo
};