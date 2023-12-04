import { readInput, readExample } from '../utils/readInput';

// let start = Date.now();
const input = readInput(3).split('\n');
// const input = readExample(3).split("\n")
let symbolList: { symbol: string; index: number; line: number }[] = [];
let numberList: { number: string; line: number; indexStart: number; indexEnd: number }[] = [];

input.forEach((line, index) => {
	//Fill array with all symbols
	let symbolRegex = [...line.matchAll(/[^\w.]/g)];
	if (symbolRegex.length >= 1) {
		symbolRegex.forEach(symbol => {
			symbolList.push({ symbol: symbol[0], line: index, index: symbol.index! });
		});
	}

	//Fill array with all numbers
	let numberRegex = [...line.matchAll(/\d+/g)];
	if (numberRegex.length >= 1) {
		numberRegex.forEach(number => {
			numberList.push({
				number: number[0],
				line: index,
				indexStart: number.index!,
				indexEnd: number.index! + number[0].length
			});
		});
	}
});

//Check if number are close to a symbol
let goodNumber: number[] = [];
let numberList2 = [...numberList];

symbolList.forEach(symbol => {
	for (let line = symbol.line - 1; line <= symbol.line + 1; line++) {
		if (line < 0 || line >= input.length) continue;

		for (let iter = symbol.index - 1; iter <= symbol.index + 1; iter++) {
			if (iter < 0 || iter >= input[0].length) continue;
			const element = input[line][iter];
			if (!isNaN(parseInt(element))) {
				const candidate = numberList.find(n => n.line === line && n.indexStart <= iter && n.indexEnd >= iter);
				if (candidate) {
					goodNumber.push(parseInt(candidate.number));
					numberList.splice(numberList.indexOf(candidate), 1);
				}
			}
		}
	}
});

console.log(goodNumber.reduce((partialSum, a) => partialSum + a, 0));

let totalRatio = 0;
symbolList
	.filter(symbol => symbol.symbol == '*')
	.forEach(symbol => {
		let actualGear = [];
		for (let line = symbol.line - 1; line <= symbol.line + 1; line++) {
			if (line < 0 || line >= input.length) continue;

			for (let iter = symbol.index - 1; iter <= symbol.index + 1; iter++) {
				if (iter < 0 || iter >= input[0].length) continue;
				const element = input[line][iter];
				if (!isNaN(parseInt(element))) {
					const candidate = numberList2.find(n => n.line === line && n.indexStart <= iter && n.indexEnd >= iter);
					if (candidate) {
						actualGear.push(parseInt(candidate.number));
						numberList2.splice(numberList2.indexOf(candidate), 1);
					}
				}
			}
		}
		if (actualGear.length === 2) {
			totalRatio += actualGear[0] * actualGear[1];
		}
	});
console.log(totalRatio);
