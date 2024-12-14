console.log('TEST Array.prototype.fill')

console.log('CASE fill the whole array with x')


var array = ['a', 'b', 'c', 'd']
var newArray = array.fill('x')
console.log(newArray);
//Array ['x', 'x', 'x', 'x']

console.log('CASE fill x with start')

var array1 = ['a', 'b', 'c', 'd']
var newArray1 = array1.fill('x', 2)
console.log(newArray1)
//['a', 'b', 'x', 'x']

console.log('CASE fill x with fromIndex until end')

var array2 = ['a', 'b', 'c', 'd']
var newArray2 = array2.fill('x', 1, 3)
console.log(newArray2)
//['a', 'x', 'x', 'd']  

console.log('CASE fill x with negative arguments')

var array3 = ['a', 'b', 'c', 'd', 'e', 'f']
var newArray3 = array3.fill('x', -3, -1)
console.log(newArray3)
//['a', 'b', 'c', 'x', 'x', 'f']