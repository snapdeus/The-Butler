

const { countColors, mergeItemsCountsAndDescriptions } = require('../utils')


const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'head');


const head = require('../jsonSeedFiles/final.head.json')

const countHeadColors = countColors(head)


const totalHead = head.length


const headMetaInfo = {
    totalHead,
    data: countHeadColors
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

headMetaInfo.data = mergeItemsCountsAndDescriptions(headMetaInfo.data, headDescripObj);
module.exports = {
    head,
    headMetaInfo
};