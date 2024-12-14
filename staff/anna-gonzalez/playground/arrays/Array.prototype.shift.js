console.log('TEST Array.prototype.shift')

console.log('CASE extract 1 from array')

var array = [1, 2, 3]
var firstElement = array.shift()

console.log(array)
// [2, 3]
console.log(firstElement)
// 1

console.log('CASE extract barcelona from array')

var array = ['barcelona', 'cuenca', 'hospitalet', 'girona', 'vancouver']
var firstElement = array.shift()

console.log(array)
// ['cuenca', 'hospitalet', 'girona', 'vancouver']
console.log(firstElement)
// barcelona

console.log('CASE extract element from empty array')

var array = []
var firstElement = array.shift()

console.log(array)
// []
console.log(firstElement)
// undefined