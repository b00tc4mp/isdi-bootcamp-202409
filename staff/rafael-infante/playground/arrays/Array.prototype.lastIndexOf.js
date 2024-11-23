console.log('TEST Array.prototype.lastIndexOf')

console.log('CASE show index of "8" in "numbers')

var numbers = [2, 4, 1, 8, 7, 39, 8]
var index = numbers.lastIndexOf(8);
console.log(index) // Expected output: 6


console.log('CASE show index of "20" in "numbers"')

var numbers = [2, 4, 1, 8, 7, 39, 8]
var index = numbers.lastIndexOf(20);
console.log(index) // Expected output: -1

console.log('CASE show index of "8" in "numbers" from index 4')
var index = numbers.lastIndexOf(8, 4);
console.log(index) // Expected output: 3
