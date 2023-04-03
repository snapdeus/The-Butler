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



module.exports = { countColors }