console.log('TEST Array.prototype.slice')

console.log('CASE start index')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
console.log(animals.slice(2))
// ["camel", "duck", "elephant"]

console.log('CASE start and end index')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
console.log(animals.slice(2, 4))
// ["camel", "duck"]
console.log(animals.slice(1, 5))
// ["bison", "camel", "duck", "elephant"]

console.log('CASE start negative index')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
console.log(animals.slice(-2))
// ["duck", "elephant"]

console.log('CASE end negative index')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
console.log(animals.slice(2, -1))
// ["camel", "duck"]