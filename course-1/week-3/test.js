const {quicksort, partition} = require('./quicksort.js')
const assert = require('assert')


function quicksorted(arr) {
	let copy = [...arr]
	quicksort(copy)
	return copy
}
function testQuickSort() {
	assert.deepStrictEqual(quicksorted([]), [])
	assert.deepStrictEqual(quicksorted([0]), [0])
	assert.deepStrictEqual(quicksorted([1]), [1])
	assert.deepStrictEqual(quicksorted([1, 2]), [1, 2])
	assert.deepStrictEqual(quicksorted([2, 1]), [1, 2])
	assert.deepStrictEqual(quicksorted([3, 2, 1]), [1, 2, 3])
	assert.deepStrictEqual(quicksorted([111, 2, 1]), [1, 2, 111])
	assert.deepStrictEqual(quicksorted([1, 2, 2, 2, 4, 1, 1]), [1, 1, 1, 2, 2, 2, 4])
	assert.deepStrictEqual(quicksorted([2148, 9058, 7742, 3153, 6324]), [2148, 3153, 6324, 7742, 9058])
	console.log('all tests pass')
}
function partitioned(arr, start, end, pivotIndex) {
	let copy = [...arr]
	partition(copy, start, end, pivotIndex)
	return copy
}

function testPartition() {
	assert.deepStrictEqual(partitioned([], 0, 0, null), [])
	assert.deepStrictEqual(partitioned([], 0, 0, 0), [])
	assert.deepStrictEqual(partitioned([], 0, 0, 1), []) // doesn't matter, will always return []
	assert.deepStrictEqual(partitioned([0], 0, 0, 0), [0])
	assert.deepStrictEqual(partitioned([0, 1], 0, 1, 0), [0, 1])
	assert.deepStrictEqual(partitioned([0, 1, 2], 0, 2, 1), [0, 1, 2])
	assert.deepStrictEqual(partitioned([0, 1, 2], 0, 2, 2), [0, 1, 2])
	assert.deepStrictEqual(partitioned([4, 3, 2, 1], 0, 3, 2), [1, 2, 4, 3])
	assert.deepStrictEqual(partitioned([6, 2, 4, 3, 7, 1], 0, 5, 2), [1, 2, 3, 4, 7, 6])
	assert.deepStrictEqual(partitioned([1, 1, 2, 1, 0], 0, 4, 1), [0, 1, 1, 1, 2])
	console.log('all tests pass')
}

testPartition()
testQuickSort()
