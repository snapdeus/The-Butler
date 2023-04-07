const fs = require('fs');
const path = require('path');
const { countColors, mergeItemsCountsAndDescriptions, read_directory } = require('../utils')
const dir = path.join(__dirname, 'torso');
const dir2 = path.join(__dirname, 'legs');

const dir3 = path.join(__dirname, 'head');
const dir4 = path.join(__dirname, 'feet');


read_directory(dir).then(data => {
    fs.writeFileSync('./jsonSeedFiles/final.torso.json', JSON.stringify(data));
});

read_directory(dir).then(data => {
    fs.writeFileSync('./jsonSeedFiles/final.legs.json', JSON.stringify(data));
});

read_directory(dir).then(data => {
    fs.writeFileSync('./jsonSeedFiles/final.head.json', JSON.stringify(data));
});

read_directory(dir).then(data => {
    fs.writeFileSync('./jsonSeedFiles/final.feet.json', JSON.stringify(data));
});
