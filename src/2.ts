import { readInput, readExample } from '../utils/readInput';

// let start = Date.now();
const input = readInput(2).split("\n")
// const input = readExample(2).split("\n")

interface game  {
    game: number,
    hands: Array<hand>
}

interface hand {
    red: number,
    blue: number,
    green: number,
    index?: number
}
const gamesParsed = input.map(game => {
    const gameId = game.match(/Game (\d*):/)![1]
    const hands = game.split(':')[1]

    //First hand
    return {
        hands: hands.split(';').map((hand, index) => {
        const red = hand.match(/(\d+) red/)
        const green = hand.match(/(\d+) green/)
        const blue = hand.match(/(\d+) blue/)
        return {
            red: red ? parseInt(red[1]) :0,
            green: green ? parseInt(green[1]) : 0,
            blue: blue ? parseInt(blue[1]) : 0,
            index: index
        }
    }),
    game: parseInt(gameId)
}
})

const reference: hand = {
    red: 12,
    green: 13,
    blue: 14
}
let countPart1 = 0
gamesParsed.forEach(g => {
    const goodHands = g.hands.filter(h => (
        h.blue <= reference.blue &&
        h.red <= reference.red &&
        h.green <= reference.green
    ))
    if (goodHands.length === g.hands.length) countPart1 += g.game
})
console.log(countPart1)

let countPart2 = 0

gamesParsed.forEach(g => {
const minHand = {
    blue: Math.max(...g.hands.map(h => h.blue)),
    red: Math.max(...g.hands.map(h => h.red)),
    green: Math.max(...g.hands.map(h => h.green))
}
const power = minHand.blue * minHand.red * minHand.green
countPart2 += power

})
console.log(countPart2)

