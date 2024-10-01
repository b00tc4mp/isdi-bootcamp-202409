console.log('TEST Array.prototype.includes')

console.log('CASE numbers includes 2')

var numbers = [1, 2, 3]
var numbersIncludes = numbers.includes(2)

console.log(numbers)
// (3) [1, 2, 3]
console.log(numbersIncludes)
// true

console.log('CASE animals includes cat')

var animals = ['cat', 'dog', 'bat']
var animalsIncludes1 = animals.includes('cat')

console.log(animals)
// (3) ['cat', 'dog', 'bat']
console.log(animalsIncludes1)
// true

console.log('CASE animals includes unicorn')

var animalsIncludes2 = animals.includes('unicorn')

console.log(animals)
// (3) ['cat', 'dog', 'bat']
console.log(animalsIncludes2)
// false