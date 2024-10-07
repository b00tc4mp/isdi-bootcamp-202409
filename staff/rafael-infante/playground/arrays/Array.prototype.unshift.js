console.log('TEST Array.prototype.unshift')

var array1 = [1, 2, 3];

console.log('CASE add one element to array')
console.log(array1.unshift('a'));
console.log(array1)
// Expected output: 4

console.log('CASE add two elements to array')
var array2 = [1, 2, 3];
var length = array2.unshift('a', 'b')
console.log(length)
console.log(array2);
// Expected output: Array ['a', 'b', 1, 2, 3]