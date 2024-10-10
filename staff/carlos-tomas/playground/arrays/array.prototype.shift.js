// The shift() method of Array instances removes the first element from an array and returns that removed element. This method changes the length of the array.

console.log('TEST Array.prototype.shift')

console.log('CASE check if "cat" is in "pets" array')

var array1 = [1, 2, 3]

var firstElement = array1.shift()

console.log(array1)
// [2, 3]

console.log(firstElement)
// 1