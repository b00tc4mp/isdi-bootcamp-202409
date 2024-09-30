console.log('TEST Array.prototype.indexof')

console.log('CASE find the index of the element') //('CASE encuentra el índice del elemento')

var numbers = [2, 4, 8, 16, 32, 8]
var index = numbers.indexOf(8)

console.log(index)
// Expected output: 2


var index2 = numbers.indexOf(20)
console.log(index2)
// Expected output: -1


var index3 = numbers.indexOf(8, 3)
console.log(index3)
// Expected output: 5


// Ejemplo con palabras

var animals = ['pinguino', 'hormiga', 'delfin', 'tejon de la miel', 'pinguino']
var pinguIndex = animals.indexOf('pinguino', 1)

console.log(pinguIndex)
// Expected output: 4
