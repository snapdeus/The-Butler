

const { countColors, mergeItemsCountsAndDescriptions, read_directory } = require('../utils')


const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'torso');


// read_directory(dir).then(data => {
//     fs.writeFileSync('./jsonSeedFiles/final.torso.json', JSON.stringify(data));
// });

const torso = require('./jsonSeedFiles/final.torso.json')

const countTorsoColors = countColors(torso)

const totalTorso = torso.length

const torsoMetaInfo = {
    totalTorso,
    torsoCounts: countTorsoColors
};


const torsoDescripObj = {
    Aqua: "Aqua",
    Blue: "Blue",
    Green: "Green",
    Orange: "Orange",
    Pink: "Pink",
    Purple: "Purple",
    Red: "Red",
    White: "White"
};

torsoMetaInfo.torsoCounts = mergeItemsCountsAndDescriptions(torsoMetaInfo.torsoCounts, torsoDescripObj);
module.exports = {
    torso,
    torsoMetaInfo
};