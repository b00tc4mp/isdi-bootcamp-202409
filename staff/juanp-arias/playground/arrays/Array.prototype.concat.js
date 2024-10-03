console.log('TEST Array.prototype.concat')
//crea un nuevo array juntando todos los arrays que le presentes.


console.log('CASE concat 2 arrays in one new array')

var array1 = ['a', 'b', 'c']
var array2 = ['d', 'e', 'f']
var arrays = array1.concat(array2)

console.log(arrays)
// ['a', 'b', 'c', 'd', 'e', 'f']


console.log('CASE concat 3 arrays in one new array')

var array1 = ['a', 'b', 'c']
var array2 = ['d', 'e', 'f']
var array3 = ['g', 'h', 'i']
var arrays = array1.concat(array2, array3)

console.log(arrays)
// ['a', 'b', 'c', 'd', 'e', 'f']
