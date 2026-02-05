function swap(arr, i, j) {
	let temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}


// partition([list-of Number], Integer, Integer, Integer) => Integer | null
function partition(arr, start, end, pivotIndex) {
	if (start === end) return null
	swap(arr, start, pivotIndex); pivotIndex = start;
	let i = start
	for (let j = start + 1; j <= end; j++) {
		if (arr[j] <= arr[pivotIndex]) {
			swap(arr, j, i + 1)
			i++
		}
	}
	swap(arr, pivotIndex, i); pivotIndex = i;
	return pivotIndex
}

function startAsPivot(arr, start, end) {
	return start
}

// quicksort([List-of Number], fn, Integer, Integer, fn)
function quicksort(arr, getPivotIndex=startAsPivot, start=0, end=(arr.length - 1), onCall=null) {
	if (start >= end) return
	if (onCall) onCall(arr, start, end) // for testing

	let pivotIndex = partition(arr, start, end, getPivotIndex(arr, start, end))
	quicksort(arr, getPivotIndex, start, pivotIndex - 1, onCall)
	quicksort(arr, getPivotIndex, pivotIndex + 1, end, onCall)
}

function testQuickSort(arr, getPivotIndex) {
	arr = [...arr]
	let count = 0
	quicksort(arr, getPivotIndex, 0, arr.length - 1, (arr, start, end) => count += end - start)
	console.log(count)
}
function generateRandomNumbers(n, max = 100) {
	return Array.from({length: n}, () => Math.floor(Math.random() * max))
}

function main() {
	const fs = require('fs')
	const data = fs.readFileSync('input.txt', 'utf8')
	let numbers = data
		.split("\r\n")
		.filter(s => s != "")
		.map(Number)
	
	// uncommend the following to test the case when the array is already sorted
	// numbers = Array.from({ length: 10000 }, (_, i) => i)

	testQuickSort(numbers, (arr, start, end) => start)
	testQuickSort(numbers, (arr, start, end) => end)
	testQuickSort(numbers, medianOfThreeIndex)
	testQuickSort(numbers, randomIndex)
}
function randomIndex(arr, start, end) {
	return start + Math.floor(Math.random() * (end - start + 1))
}
function medianOfThreeIndex(arr, start, end) {
	const mid = Math.floor((start + end) / 2)
	return [[arr[start], start],
		    [arr[mid]  , mid],
		    [arr[end]  , end]]
			.sort((a, b) => a[0] - b[0])
			.map(k => k[1])[1]
}

if (require.main === module) {
	main()
}
module.exports = {quicksort, partition}

