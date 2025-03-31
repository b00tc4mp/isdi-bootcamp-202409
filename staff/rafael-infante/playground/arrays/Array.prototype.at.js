console.log('TEST Array.prototype.at')

console.log('CASE show "perro" from "animals" ')

var animals = ['perro', 'gato', 'cabra']
var animal = animals.at(0)

console.log(animal)
// expected output: 'perro'


console.log('CASE show "cabra" from "animals" ')

var animals = ['perro', 'gato', 'cabra']
var animal = animals.at(-1)

console.log(animal)
// expected output: 'cabra'
