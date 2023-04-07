
const potions = require('./potions.json')

const { countColors, mergeItemsCountsAndDescriptions } = require('../utils')

const countPotionColors = countColors(potions)

const totalPotions = potions.length

const potionsMetaInfo = {
    totalPotions,
    potionCounts: countPotionColors
};


const potionsDescripObj = {
    Green: "Raise Magic Attack Potion: Temporarily boost the user's magical attack power, allowing them to deal more damage with magic spells and abilities.",
    Blue: "Raise Magic Defense Potion: Temporarily increase the user's magical defense, improving their resistance to magic spells and abilities.",
    Red: "Raise Physical Attack Potion: Temporarily increase the user's physical offense, allowing them to deal more damage with physical attacks.",
    Purple: "Raise Physical Defense Potion: Temporarily enhance the user's physical defense, making them more resistant to physical attacks.",
    Orange: "Replenish AP Meter Potion: Replenish the user's action points (AP) meter, allowing them to perform more actions in combat.",
    Aqua: "Replenish HP Potion: Replenish the user's health points (HP), effectively healing them and improving their survivability.",
    Pink: "Raise Evade: Temporarily boost the user's evade, allowing them to dodge more attacks and effects.",
};


potionsMetaInfo.potionCounts = mergeItemsCountsAndDescriptions(potionsMetaInfo.potionCounts, potionsDescripObj);

module.exports = {
    potions,
    potionsMetaInfo
};