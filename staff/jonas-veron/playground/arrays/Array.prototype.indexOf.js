console.log('TEST Array.prototype.indexOf')

console.log('CASE extract the index of the element')

var numbers = [2, 4, 8, 16, 32, 8]
var index = numbers.indexOf(8)
var index2 = numbers.indexOf(20)
var index3 = numbers.indexOf(8, 3)
console.log(index)
//2
console.log(index2)
//-1
console.log(index3)
//5
console.log(numbers)
//[2, 4, 8, 16, 32]

//Ejemplo con palabras

var animals = ['pingu','hormiga', 'delfin', 'tejon de la miel', 'pingu']

var pinguIndex = animals.indexOf('pingu', 1)
console.log(pinguIndex)
//4



