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


module.exports = { countColors, mergeItemsCountsAndDescriptions }