console.log('TEST Array.prototype.at')

console.log('CASE get number at index 2 in numbers')

var numbers = [10, 20, 30, 40, 50];
var number = numbers.at(2)

console.log('An index of ' + 2 + ' returns ' + numbers.at(2))
// An index of 2 returns 30
console.log('An index of ' + -2 + ' returns ' + numbers.at(-2))
// An index of -2 returns 40

console.log('CASE get kale at index 3 in veggies')

var veggies = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']
var veggie = veggies.at(3)

console.log(veggies)
// (5) ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']
console.log(veggie)
// 4

console.log('CASE get green at index -3 in colours')

var colours = ['red', 'green', 'blue', 'yellow']
var colour = colours.at(-3)

console.log(colours)
// (4) ['red', 'green', 'blue', 'yellow']
console.log(colour)
// green