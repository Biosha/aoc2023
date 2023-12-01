import { readInput, readExample } from '../utils/readInput';

const input = readInput(1);

const step1 = input
	.split('\n')
	.map(l => {
		let h = l.match(/\d/g)?.join('');
		if (h) {
			if (h.length === 0) return;
			if (h.length === 1) return parseInt(`${h}${h}`);
			else return parseInt(`${h[0]}${h[h.length - 1]}`);
		} else return;
	})
	.filter(t => typeof t === 'number') as Array<number>;
console.log(`Step 1 result is ${step1.reduce((partialSum, a) => partialSum + a, 0)}`);

const stringNumbers: Record<string, number> = {
	zero: 0,
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9
};
let arrayOfString = Object.keys(stringNumbers);
let arrayofNumbers = Object.values(stringNumbers);

const step2 = input.split('\n').map(s => {
    //Create an array with all match and their index
	let a: { value: number; index: number }[] = [];
	let i = 0;

    //For string numbers
	for (let strNum of arrayOfString) {
		var reg = new RegExp(strNum, 'g');
		let matches = [...s.matchAll(reg)];

		matches.forEach(match => {
			a.push({ value: Number(arrayofNumbers[i]), index: match.index! });
		});
		i++;
	}

    //For number numbers
	for (let j = 0; j < s.length; j++) {
		if (!isNaN(Number(s[j]))) {
			a.push({ value: parseInt(s[j]), index: j });
		}
	}

    //Sort by index
	a.sort((a, b) => a.index - b.index);

    //Keep only the first and last
	if (a.length === 0) return;
	if (a.length === 1) return parseInt(`${a[0].value}${a[0].value}`);
	else return parseInt(`${a[0].value}${a[a.length - 1].value}`);
}) as Array<number>;
console.log(`Step 2 result is ${step2.reduce((partialSum, a) => partialSum + a, 0)}`);
