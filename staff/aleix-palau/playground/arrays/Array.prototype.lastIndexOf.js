console.log('TEST: Array.prototype.lastIndexOf')

console.log('CASE: Find the last index of the element Dodo')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo']
console.log(animals.lastIndexOf('Dodo'))
// 3

var numbers = [2, 5, 9, 2];
console.log(numbers.lastIndexOf(2, -2))
// 0

//  returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.