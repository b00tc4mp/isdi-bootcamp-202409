console.log('TEST Array.prototype.unshift')



console.log('CASE add element at the start on array')
var array1 = [1, 2, 3];
var length1 = array1.unshift(4);

console.log(length1)
//4
console.log(array1)
//Array [4, 1, 2, 3]

console.log('CASE add two element at the start of the array')

var array2 = [1, 2, 3]
var length2 = array2.unshift('a', 'b')
console.log(length2)
console.log(array2)