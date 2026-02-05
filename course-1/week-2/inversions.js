// I tried to improve the readability of the code
// for instance I did merging and inversion counting as two separate functions
// but I found it challenging to create readable code for this problem :D

const assert = require('assert')

function halves(arr) {
  const mid = Math.floor(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

function countInversionsAndSort(arr) {
	// countInversions([Number, Number, ...]) : Number (Non-negative Integer)
	// count the number of inversions in the array
	if (arr.length <= 1) return [0, arr]
	 
	const [left, right] = halves(arr)
	let [leftInversions, sortedLeft] = countInversionsAndSort(left)
	let [rightInversions, sortedRight] = countInversionsAndSort(right)
	let sorted = merge(sortedLeft, sortedRight)
	let splitInversions = countSplitInversions(sortedLeft, sortedRight)
	return [leftInversions + rightInversions + splitInversions, sorted]
	
}

function merge(arr1, arr2) {
	let left = 0, right = 0
	let mergedArray = []
	while(left < arr1.length && right < arr2.length) {
		if (arr1[left] <= arr2[right]) {
			mergedArray.push(arr1[left++])
		} else {
			mergedArray.push(arr2[right++])
		}
	}
	return mergedArray
		.concat(arr1.slice(left))
		.concat(arr2.slice(right))
}

function countSplitInversions(arr1, arr2) {
	let left = 0, right = 0, inversions = 0
	while(left < arr1.length && right < arr2.length) {
		if (arr1[left] <= arr2[right]) left++
		else {
			inversions += (arr1.length - left)
			right++
		}
	}
	return inversions
}


function main() {
	const fs = require('fs')
	const data = fs.readFileSync('numbers.txt', 'utf8')
	const numbers = data
		.split("\r\n")
		.filter(s => s != "")
		.map(Number)
	console.log(countInversionsAndSort(numbers))
}

if (require.main === module) {
	main()
}
module.exports = countInversionsAndSort

