//crea un nuevo array


console.log('TEST Array.prototype.concat')

console.log('CASE concat an array to two arrays')

var letters= ['a', 'b', 'c']
var numbers = [1, 2, 3]
var names = ['juan', 'pepe', 'carlos']

var newArray = letters.concat(numbers, names)
console.log(newArray)
//['a', 'b', 'c', 1, 2, 3, 'juan', 'pepe, 'carlos']