console.log('TEST Array.prototype.slice')

console.log('CASE slice animals with a start index')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
var slicedAnimals1 = animals.slice(2)

console.log(slicedAnimals1)
// (3) ['camel', 'duck', 'elephant']

console.log('CASE slice animals with a start and end index')

var slicedAnimals2 = animals.slice(1, 4)

console.log(slicedAnimals2)
// (3) ['bison', 'camel', 'duck']

console.log('CASE slice animals with negative indexes')

var slicedAnimals3 = animals.slice(3, -1)
var slicedAnimals4 = animals.slice(-4, 3)
var slicedAnimals5 = animals.slice(-5, -1)

console.log(slicedAnimals3)
// ['duck']
console.log(slicedAnimals4)
// (2) ['bison', 'camel']
console.log(slicedAnimals5)
// (4) ['ant', 'bison', 'camel', 'duck']

console.log('CASE no index inputs')

var slicedAnimals6 = animals.slice()

console.log(slicedAnimals6)
// (5) ['ant', 'bison', 'camel', 'duck', 'elephant']
// Nothing changes

console.log('CASE start index >= array.length')

var slicedAnimals7 = animals.slice(10)

console.log(slicedAnimals7)
// []

console.log('CASE end index < -array.length')

var slicedAnimals8 = animals.slice(undefined, -10)

console.log(slicedAnimals8)
// [] ??

console.log('CASE end index >= start index')

var slicedAnimals9 = animals.slice(3, 3)

console.log(slicedAnimals9)
// []