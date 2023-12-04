export function sum (numbers: Array<number>): number {
    return numbers.reduce((partialSum, a) => partialSum + a, 0)
}