console.log('TEST Array.prototype.indexOf')

console.log('CASE show index of "8" in "numbers')

var numbers = [2, 4, 1, 8, 7, 39, 8]
var index = numbers.indexOf(8);
console.log(index) // Expected output: 3

console.log('CASE show index of "20" in "numbers"')

var numbers = [2, 4, 1, 8, 7, 39, 8]
var index = numbers.indexOf(20);
console.log(index) // Expected output: -1

console.log('CASE show index of "8" in "numbers" from index 4')

var numbers = [2, 4, 1, 8, 7, 39, 8]
var index = numbers.indexOf(8, 4);
console.log(index) // Expected output: 6

console.log('CASE show index of "bison" in "animals" from index 2')

var animals = ['ant', 'bison', 'camel', 'duck', 'bison'];
var index = animals.indexOf('bison', 2)

console.log(index) // Expected output: 4

console.log('CASE get index of c')

var chars = ['a', 'b', 'c', 'b', 'a']
var index = chars.indexOf('c')
console.log(index)  // expected output 2
