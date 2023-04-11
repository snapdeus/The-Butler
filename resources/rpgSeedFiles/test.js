const { scrollsMetaInfo, scrolls } = require('./scrolls/scrolls')
const { potionsMetaInfo, potions } = require('./potions/potions')
const { gemsOfPowerMetaInfo } = require('./gemsOfPower/gemsOfPower')
const { clothing, clothingMetaInfo } = require('./clothing/index')




// console.dir(feetMetaInfo, { depth: 5 })

function testJsonFile(metaInfo) {
    let itemSet = metaInfo.data
    let errorN = [];
    let i = 0
    for (let object in itemSet) {
        if (itemSet[object].metaInfo.AllErrors > 0) {
            errorN.push(itemSet[object].metaInfo.ErrorArray)
            itemSet[object].errorDet = true
        } else {
            itemSet[object].errorDet = false;
        }


    }
    // console.dir(metaInfo, { depth: 4 })
    if (errorN.length > 0) {
        return console.log(`${ errorN.length } error detected`, errorN)

    }
    console.log("Looking Good")
    console.log(metaInfo)
}

testJsonFile(clothingMetaInfo[2])

function testJsonFileForObject(genInfo) {
    // console.log(metaInfo)
    let errorN = [];
    for (let object in genInfo.data) {

        if (genInfo.data[object].metaInfo.AllErrors > 0) {
            errorN.push(genInfo.data[object].metaInfo.ErrorArray)
            genInfo.data[object].errorDet = true
        } else {
            genInfo.data[object].errorDet = false;
        }
    }
    if (errorN.length > 0) {
        // console.log(errorN)
        return errorN
        //DOUBLE ARRAY BECAUSE BELOW
    } else return [['no error']]
    return
}

// const test = testJsonFileForObject(clothingMetaInfo[0])

function testCategory(category) {
    // console.dir(category)
    const errorNObj = {}
    for (let obj of category) {
        // console.log(obj)
        const result = testJsonFileForObject(obj)
        // console.log(result[0][1])
        for (let i = 0; i < result[0].length; i++)
            //DOUBLE ARRAY BECAUSE HERE
            if (errorNObj[result[0][i]]) {

                errorNObj[result[0][i]] += 1
            } else {
                errorNObj[result[0][i]] = 1
            }

    }
    console.log(errorNObj)
}

// testCategory(clothingMetaInfo)

// const fs = require('fs')

// for (potion of potions) {
//     potion.Weight = 20


// }

// fs.writeFile('./output.json', JSON.stringify(potions), err => {
//     if (err) {
//         console.error(err);
//     }
//     // file written successfully
// });
