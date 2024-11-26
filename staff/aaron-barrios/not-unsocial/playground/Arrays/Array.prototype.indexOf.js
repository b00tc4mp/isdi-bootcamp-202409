console.log('TEST Array.prototype.indexOf')

console.log('CASE obtain 100,s index')

var nums = [100, 200, 300, 100]

var index = nums.indexOf(100)
console.log(index)
// 0

console.log('CASE obtain index of a nonValor')

var index2 = nums.indexOf(20)
console.log(index2)
// -1

console.log('CASE obtain index of 100 with a fromIndex 1')

//EL SEGUNDO NUM ES EL INDICE A PARTIR 
//DEL CUAL EMPIEZA A CONTAR
var index3 = nums.indexOf(100, 1)
console.log(index2)
// 3

//ejemplo con animales
var animals = ['ostrich', 'penguin', 'tiger', 'dolphin', 'ostrich']

var ostrichIndex = animals.indexOf('ostrich', 1)
console.log(ostrichIndex)
// 4