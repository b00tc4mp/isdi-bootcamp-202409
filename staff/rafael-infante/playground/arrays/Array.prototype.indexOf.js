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
var index = beasts.indexOf('bison', 2)

console.log(index) // Expected output: 4

