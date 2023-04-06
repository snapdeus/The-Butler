
const scrolls = require('./scrolls.json')

const { countColors, mergeItemsCountsAndDescriptions } = require('./utils')



const countScrollColors = countColors(scrolls)

const totalScrolls = scrolls.length

const scrollsMetaInfo = {
    totalScrolls,
    scrollCounts: countScrollColors
};


const scrollsDescripObj = {
    Purple: "Raise Self Physical Defense Scrolls: Temporarily enhance the user's physical defense, making them more resistant to physical attacks.",
    Blue: "Raise Self Magical Defense Scrolls: Temporarily increase the user's magical defense, improving their resistance to magic spells and abilities.",
    Green: "Raise Self Magical Attack Scrolls: Temporarily boost the user's magical attack power, allowing them to deal more damage with magic spells and abilities.",
    Red: "Raise Self Physical Attack Scrolls: Temporarily increase the user's physical offense, allowing them to deal more damage with physical attacks.",
    Aqua: "Lower Opponents Physical Defense Scrolls: Temporarily weaken an opponent's physical defense, making them more susceptible to physical damage.",
    Orange: "Lower Opponents Magic Defense Scrolls: Temporarily diminish an opponent's magical defense, making them more vulnerable to magical attacks.",
    Pink: "Lower Opponents Evade: Temporarily weaken an opponent's evade, making them less likely to dodge damage and other effects.",
    Black: "Do Magic Attack Scrolls: Unleash a magical attack with specific effects based on the subcategory."
};


scrollsMetaInfo.scrollCounts = mergeItemsCountsAndDescriptions(scrollsMetaInfo.scrollCounts, scrollsDescripObj);
module.exports = {
    scrolls,
    scrollsMetaInfo
};