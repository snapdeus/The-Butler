

const gemsOfPower = [
    {
        Name: "Sorcerous Blue Gem of Power",
        Color: "Blue",
        Effect: "Unlocks ancient arcane knowledge",
        Description: "A deep blue gem imbued with the mystical energy of an ancient sorcerer, granting the bearer the understanding of forgotten arcane secrets.",
        Filename: "0001_gem_of_power.png",
        Type: "Gem"
    },
    {
        Name: "Abyssal Aqua Gem of Power",
        Color: "Aqua",
        Effect: "Manipulates water and its forms",
        Description: "An aqua-colored gem that contains the essence of the deep ocean, allowing the wielder to control water and even manipulate it in various forms.",
        Filename: "0002_gem_of_power.png",
        Type: "Gem"
    },
    {
        Name: "Eldritch Green Gem of Power",
        Color: "Green",
        Effect: "Enhances nature-based powers",
        Description: "A luminous green gem that harnesses the untamed power of nature. When held, it enhances the user's nature-based abilities and strengthens their connection to the Earth.",
        Filename: "0003_gem_of_power.png",
        Type: "Gem"
    },
    {
        Name: "Solar Yellow Gem of Power",
        Color: "Yellow",
        Effect: "Radiates light and warmth",
        Description: "A radiant yellow gem infused with the energy of the sun. Its bearer can emit intense light and warmth, banishing darkness and providing solace in harsh environments.",
        Filename: "0004_gem_of_power.png",
        Type: "Gem"
    },
    {
        Name: "Pyroclastic Orange Gem of Power",
        Color: "Orange",
        Effect: "Controls fire and heat",
        Description: "An orange gem imbued with the unstoppable force of volcanic fury. It grants the wielder power over fire and heat, unleashing devastating blazes and infernos.",
        Filename: "0005_gem_of_power.png",
        Type: "Gem"
    },
    {
        Name: "Red Crimson Vitality Gem of Power",
        Color: "Red",
        Effect: "Offers increased physical prowess",
        Description: "A blood-red gem filled with raw, primal energy. Its holder gains immense physical strength, speed, and endurance, pushing their abilities to superhuman levels.",
        Filename: "0006_gem_of_power.png",
        Type: "Gem"
    },
    {
        Name: "Mystifying Purple Gem of Power",
        Color: "Purple",
        Effect: "Grants mental and psychic enhancements",
        Description: "A mysterious purple gem imbued with the power of the mind. It bestows upon its bearer heightened mental capacities, psychic powers, and an intuitive understanding of the universe.",
        Filename: "0007_gem_of_power.png",
        Type: "Gem"
    }
];


const { countColors, mergeItemsCountsAndDescriptions } = require('./utils')

const countGemColors = countColors(gemsOfPower)
const totalGems = gemsOfPower.length

const gemsOfPowerMetaInfo = {
    totalGems,
    gemCounts: countGemColors
};

const gemsOfPowerDescripObj = {
    Blue: "A deep blue gem imbued with the mystical energy of an ancient sorcerer, granting the bearer the understanding of forgotten arcane secrets.",
    Aqua: "An aqua-colored gem that contains the essence of the deep ocean, allowing the wielder to control water and even manipulate it in various forms.",
    Green: "A luminous green gem that harnesses the untamed power of nature. When held, it enhances the user's nature-based abilities and strengthens their connection to the Earth.",
    Yellow: "A radiant yellow gem infused with the energy of the sun. Its bearer can emit intense light and warmth, banishing darkness and providing solace in harsh environments.",
    Orange: "An orange gem imbued with the unstoppable force of volcanic fury. It grants the wielder power over fire and heat, unleashing devastating blazes and infernos.",
    Red: "A blood-red gem filled with raw, primal energy. Its holder gains immense physical strength, speed, and endurance, pushing their abilities to superhuman levels.",
    Purple: "A mysterious purple gem imbued with the power of the mind. It bestows upon its bearer heightened mental capacities, psychic powers, and an intuitive understanding of the universe.",
}

gemsOfPowerMetaInfo.gemCounts = mergeItemsCountsAndDescriptions(gemsOfPowerMetaInfo.gemCounts, gemsOfPowerDescripObj)

module.exports = {
    gemsOfPower,
    gemsOfPowerMetaInfo
};