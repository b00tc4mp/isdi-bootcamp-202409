console.log('TEST Array.prototype.unshift')

console.log('CASE add an element')

var array = [1, 2, 3]
var newLength = array.unshift(4)

console.log(array)
// [4, 1, 2, 3]
console.log(newLength)
// 4

console.log('CASE add two elements')

var array = [1, 2, 3]
var newLength = array.unshift(4, 5)

console.log(array)
// [4, 5, 1, 2, 3]
console.log(newLength)
// 5