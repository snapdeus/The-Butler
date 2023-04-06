
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'clothes/torso');

function countColors(itemArray) {
    return itemArray.reduce((acc, cur) => {
        if (acc[cur.Color]) {
            acc[cur.Color] = acc[cur.Color] + 1
        } else {
            acc[cur.Color] = 1
        }
        return acc;
    }, {})
}




function mergeItemsCountsAndDescriptions(itemCounts, itemDescripObj) {
    const updatedItemsCounts = Object.entries(itemCounts).map(([color, count]) => ({
        [color]: {
            count: count,
            description: itemDescripObj[color]
        }
    }));
    const combinedItemsCounts = Object.assign({}, ...updatedItemsCounts);
    return combinedItemsCounts;
};



let finalContent = [];
const read_directory = async dir =>
    fs.readdirSync(dir).reduce((finalContent, file) => {
        filePath = path.join(dir, file);
        console.log(filePath);
        let content = require(filePath);
        finalContent.push(...content)
        return finalContent;
    }, []);


module.exports = { countColors, mergeItemsCountsAndDescriptions, read_directory };

