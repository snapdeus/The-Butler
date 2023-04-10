
const fs = require('fs');
const path = require('path');


function countColors(itemArray) {
    return itemArray.reduce((acc, cur) => {
        if (acc[cur.Color]) {
            acc[cur.Color].count += 1;
            if (acc[cur.Color].Filename === cur.Filename.slice(5)) {
                acc[cur.Color].FilenameCount += 1;
            } else if (acc[cur.Color].ErrorArray.indexOf(cur.Filename.slice(5))) {

                acc[cur.Color].AllErrors += 1
                acc[cur.Color].ErrorArray.push(cur.Filename.slice(5))
            } else {
                acc[cur.Color].ErrorArray.push(cur.Filename.slice(5))
            }
        } else {
            acc[cur.Color] = {
                count: 1,
                Filename: cur.Filename.slice(5),
                FilenameCount: 1,
                AllErrors: 0,
                ErrorArray: []
            };
        }
        return acc;
    }, {});
}




// function mergeItemsCountsAndDescriptions(itemCounts, itemDescripObj) {
//     const updatedItemsCounts = Object.entries(itemCounts).map(([color, count]) => ({
//         [color]: {
//             count: count,
//             description: itemDescripObj[color]
//         }
//     }));
//     const combinedItemsCounts = Object.assign({}, ...updatedItemsCounts);
//     return combinedItemsCounts;
// };


function mergeItemsCountsAndDescriptions(itemCounts, itemDescripObj) {
    // console.log(Object.entries(itemCounts))

    const updatedItemsCounts = Object.entries(itemCounts).map(([object, count]) => ({

        [object]: {
            description: itemDescripObj[object],
            metaInfo: count,

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



