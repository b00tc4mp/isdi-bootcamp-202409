console.log('TEST Array.prototype.push')

console.log('CASE add "cows" to the end of array')

var animals = ['pigs', 'goats', 'sheep']
var length = animals.push('cows')

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.log(length)
// 4


console.log('CASE add "chickens", "cats", and "dogs" to the end of array')

var animals = ['pigs', 'goats', 'sheep']
var length = animals.push('chickens', 'cats', 'dogs')

console.log(animals)
// ['pigs', 'goats', 'sheep', 'chickens', 'cats', 'dogs']
console.log(length)
// 6