
const characters = [
    {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        eye_color: 'blue',
        gender: 'male',
    },
    {
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        eye_color: 'yellow',
        gender: 'male',
    },
    {
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        eye_color: 'brown',
        gender: 'female',
    },
    {
        name: 'Anakin Skywalker',
        height: '188',
        mass: '84',
        eye_color: 'blue',
        gender: 'male',
    },
];

//map exercises
const mapArrOfNames = characters.map(x => x.name);
const mapArrOfHeights = characters.map(x => x.height)
const mapArrOfNameAndHeights = characters.map(x => ({ name: x.name, height: x.height }))
const mapArrOfFirstNames = characters.map(x => x.name.split(' ')[0])

//reduce exercises

const totalMass = characters.reduce((acc, curVal) => acc + parseInt(curVal.mass), 0)
const totalHeight = characters.reduce((acc, curVal) => acc + parseInt(curVal.height), 0)
const totalEyeColor = characters.reduce((acc, cur) => {
    if (acc[cur.eye_color]) {
        acc[cur.eye_color] = acc[cur.eye_color] + 1
    } else {
        acc[cur.eye_color] = 1
    }
    return acc;
}, {})

const totalNameCharacters = characters.reduce((acc, cur) => acc + cur.name.length, 0)


//filter exercises

const massGreaterThanNum = characters.filter(char => char.mass > 100)
const heightLessThanNum = characters.filter(char => char.height < 200)
const maleCharacters = characters.filter(char => char.gender === 'male')
const femaleCharacters = characters.filter(char => char.gender === 'female')

console.log(femaleCharacters)