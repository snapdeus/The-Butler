const { torsoMetaInfo, torso } = require('./torso')
const { legsMetaInfo, legs } = require('./legs')
const { headMetaInfo, head } = require('./head')
const { feetMetaInfo, feet } = require('./feet')
const { handsMetaInfo, hands } = require('./hands')


const clothing = {
    torso,

    legs,

    head,

    feet,

    hands,


}
const clothingMetaInfo =
    [
        torsoMetaInfo,
        legsMetaInfo,
        headMetaInfo,
        feetMetaInfo,
        handsMetaInfo,]


module.exports = {
    clothing,
    clothingMetaInfo
};