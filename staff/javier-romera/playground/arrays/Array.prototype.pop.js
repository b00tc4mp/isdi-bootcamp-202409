console.log('TEST Array.prototype.pop')

console.log('CASE extract tomato from veggies')

var veggies = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
var veggie = veggies.pop()

console.log(veggies)
// (5) ['broccoli', 'cauliflower', 'cabbage', 'kale'];
console.log(veggie)
// tomato

console.log('CASE extract yellow from colors')

var colors = ['red', 'green', 'blue', 'yellow']
var color = colors.pop()

console.log(colors)
// (3) ['red', 'green', 'blue']
console.log(color)
// yellow

console.log('CASE extract from empty iterable')

var numbers = []
var number = numbers.pop()

console.log(numbers)
// []
console.log(number)
//undefined