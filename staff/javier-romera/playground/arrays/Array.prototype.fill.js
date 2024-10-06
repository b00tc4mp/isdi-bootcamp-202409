console.log('TEST Array.prototype.fill')

console.log('CASE fill entire array with 6')

var array1 = [1, 2, 3, 4, 5]

console.log(array1.fill(6))
// (5) [6, 6, 6, 6, 6]

console.log('CASE fill array from a starting position')

console.log(array1.fill(5, 3))
// (5) [6, 6, 6, 5, 5]

console.log('CASE fill array from a starting position to an end position')

console.log(array1.fill(9, 1, 3))