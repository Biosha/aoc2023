import { readInput, readExample } from '../utils/readInput';
import { sum } from '../utils/sum';

let start = Date.now();
const input = readInput(4).split('\n');
// const input = readExample(4).split("\n")

console.log(
	'Step 1:',
	sum(
		input.map(line => {
			const card = line.split(':')[0];
			const winning = line.split(':')[1].split('|')[0].matchAll(/(\d+)/g);
			const winningNumbers = [...winning].map(n => parseInt(n[0]));
			const given = line.split(':')[1].split('|')[1].matchAll(/(\d+)/g);
			const givenNumbers = [...given].map(n => parseInt(n[0]));

			const commonNumbers = winningNumbers.filter(n => givenNumbers.includes(n));
			return commonNumbers.length > 0 ? 1 * Math.pow(2, commonNumbers.length - 1) : 0;
		})
	)
);

let pile = [];
for (let index = 0; index < input.length; index++) {
	pile.push({ card: index + 1, quantity: 1 });
}

for (let index = 0; index < input.length; index++) {
	const line = input[index];
	const card = line.split(':')[0].match(/(\d+)/)![0];
	const winning = line.split(':')[1].split('|')[0].matchAll(/(\d+)/g);
	const winningNumbers = [...winning].map(n => parseInt(n[0]));
	const given = line.split(':')[1].split('|')[1].matchAll(/(\d+)/g);
	const givenNumbers = [...given].map(n => parseInt(n[0]));

	const commonNumbers = winningNumbers.filter(n => givenNumbers.includes(n)).length;
	for (let win = 0; win < commonNumbers; win++) {
		pile.find(c => c.card === parseInt(card) + 1 + win)!.quantity += pile.find(
			c => c.card === parseInt(card)
		)!.quantity;
	}
}

console.log('Step 2:', sum(pile.map(p => p.quantity)));
let timeTaken = Date.now() - start;
console.log('Total time taken : ' + timeTaken + ' milliseconds');
