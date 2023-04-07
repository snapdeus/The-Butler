const { scrollsMetaInfo, scrolls } = require('./scrolls/scrolls')
const { potionsMetaInfo, potions } = require('./potions/potions')
const { gemsOfPowerMetaInfo } = require('./gemsOfPower/gemsOfPower')
const { torsoMetaInfo, torso } = require('./clothing/torso')
const { legsMetaInfo, legs } = require('./clothing/legs')
const { headMetaInfo, head } = require('./clothing/head')

console.log(headMetaInfo)

const fs = require('fs')

// for (potion of potions) {
//     potion.Weight = 20


// }

// fs.writeFile('./output.json', JSON.stringify(potions), err => {
//     if (err) {
//         console.error(err);
//     }
//     // file written successfully
// });
