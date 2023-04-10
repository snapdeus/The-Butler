const fs = require('fs');
const path = require('path');
const { countColors, mergeItemsCountsAndDescriptions, read_directory } = require('../utils')
const dir = path.join(__dirname);

//NOTE, IT MATTERS WHERE THIS FILE IS

const getDirNames = function (dir) {
    const dirNames = fs.readdirSync(dir, { withFileTypes: true });
    return dirNames.filter(dirent => dirent.isDirectory())
}


const dirNames = getDirNames(dir)


async function main() {
    for (dirName of dirNames) {
        console.log(dirName.name)
        const readThisDir = path.join(__dirname, dirName.name)
        await read_directory(readThisDir).then(data => {
            fs.writeFileSync(`../jsonSeedFiles/final.${ dirName.name }.json`, JSON.stringify(data));
        });
    }

}

main()
