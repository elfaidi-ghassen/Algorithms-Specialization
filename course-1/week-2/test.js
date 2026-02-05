const assert = require("assert")
const countInversionsAndSort = require("./inversions")
function test_inversions() {
	assert.deepStrictEqual(countInversionsAndSort(                []), [0, []])
	assert.deepStrictEqual(countInversionsAndSort(               [1]), [0, [1]])
	assert.deepStrictEqual(countInversionsAndSort(            [1, 2]), [0, [1, 2]])
	assert.deepStrictEqual(countInversionsAndSort(         [1, 2, 3]), [0, [1, 2, 3]])
	assert.deepStrictEqual(countInversionsAndSort(      [1, 2, 3, 4]), [0, [1, 2, 3, 4]])
	assert.deepStrictEqual(countInversionsAndSort(            [2, 1]), [1, [1, 2]])
	assert.deepStrictEqual(countInversionsAndSort(         [3, 2, 1]), [3, [1, 2, 3]])
	assert.deepStrictEqual(countInversionsAndSort(      [4, 3, 2, 1]), [6, [1, 2, 3, 4]])
	assert.deepStrictEqual(countInversionsAndSort(  [4, 5, 2, 1, 10]), [5, [1, 2, 4, 5, 10]])
	assert.deepStrictEqual(countInversionsAndSort([1, 3, 5, 2, 4, 6]), [3, [1, 2, 3, 4, 5, 6]])

	console.log('all tests pass')
}
test_inversions()