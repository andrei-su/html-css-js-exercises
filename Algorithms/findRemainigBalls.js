"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
	// console.log('Reading: ' + inputStdin);
	console.log('This is inputString before reading value:\n' + inputString)
	console.log('inputString[0] before reading: ' + inputString[0])
	inputString += inputStdin;
	console.log('inputString[0] after: ' + inputString[0])
	console.log('I added inputStdin to inputString:\n' + inputString);
});

process.stdin.on("end", function () {
	console.log('End of reading: ');
	inputString = inputString.split("\n");
	console.log('Input string is: ' + inputString);

	main();
});

function readLine() {
	return inputString[currentLine++];
}

/* if the array is empty then it means that there are no lines to read, return empty array
if there is only one ball, return array with index 0
if both balls have colliding directions then
	if strengths are equal, both balls are destroyed, return no index
	if one ball's strength is greater, than the other is destroyed, return the index of the first ball
if both balls have the same direction return both indexes
if the balls have oposite directions return both indexes */

function findRemainingBalls(direction, strength) {
	// Write your code here
	if (direction.length !== strength.length) {
		return -1;
	}
	if (direction.length === 1) {
		return [0];
	}
	let result = [];
	let i = 0, j = 1;

	for(; j < direction.length; j++) {
		if(direction[i] < 0) {
			result.push(i);
			if(j === direction.length - 1) {
				result.push(j);
			}
			i++;
		}
	}


	// if(j === direction.length) return;
	while (j < direction.length) {
		if(direction[i] === direction[j] || direction[i] < direction[j]) {
			i++;
			j++;
		} else if (strength[i] === strength[j]) {
			return;
		} else if (strength[i] > strength[j]) {
			j++;
		} else if (strength[i] < strength[j]) {
			i--;
		} 
	}


	return result;

	// let result = [...Array(direction.length).keys()];

	// for (let i = 0; i < direction.length; i++) {
	// 	result.push(i)
	// }

	for (let i = 0; i < direction.length; i++) {

		if (i === 0 && direction[i] === -1) {
			result.push(i);
			continue;
		}

		if (i === direction.length - 1){
			break;
		}

		if (direction[i] > direction[i + 1]) {
			if (strength[i] > strength[i + 1]) {
				result.push(i);
			} else if (strength[i] < strength[i + 1]) {
				result.push(i + 1);
			} else {
			}
		} else if (direction[i] < direction[i + 1]) {
		} else {
		}
	}
	return result;
}

function main() {
	const ws = fs.createWriteStream('./output');

	const directionCount = parseInt(readLine().trim(), 10);

	let direction = [];

	for (let i = 0; i < directionCount; i++) {
		console.log('Direction Count: ' + directionCount);
		const directionItem = parseInt(readLine().trim(), 10);
		console.log('Direction Item: ' + directionItem);
		direction.push(directionItem);
	}

	const strengthCount = perseInt(readLine().trim(), 10);

	let strength = [];

	for (let i = 0; i < strengthCount; i++) {
		const strengthItem = parseInt(readLine().trim(), 10);
		strength.push(strengthItem);
	}
	const result = findRemainingBalls(direction, strength);

	ws.write(result.join("\n") + "\n");

	ws.end();
}

/* Edge cases
[1,-1] [1,1]
 */
// 
// Edge cases
// [1,-1,1,-1,-1,1,-1,-1,1,1]
// 