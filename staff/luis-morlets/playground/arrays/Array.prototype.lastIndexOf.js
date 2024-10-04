console.log('TEST Array.prototype.lastIndexOf')

console.log('CASE extract last index of the element')

var numbers = [2, 5, 9, 2];
var index = numbers.lastIndexOf(2);
console.log(index)
//3

console.log('CASE extract last index of an element not in the array')

var numbers = [2, 5, 9, 2];
var index = numbers.lastIndexOf(7);
console.log(index)
//-1

console.log('CASE extract last index of the element using a positive fromIndex')

var numbers = [2, 5, 9, 2];
var index = numbers.lastIndexOf(2, 2);
console.log(index)
//0

console.log('CASE extract last index of the element using a negative fromIndex')

var numbers = [2, 5, 9, 2];
var index = numbers.lastIndexOf(2, -1);
console.log(index)
//3