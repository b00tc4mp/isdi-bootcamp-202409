console.log('TEST Array.prototype.at')

console.log('CASE locate index 2 on numbers')

var numbers = [10, 20, 30, 40, 50];
var number = numbers.at(2)

console.log('An index of ' + 2 + ' returns ' + numbers.at(2))
// An index of 2 returns 30
console.log('An index of ' + -2 + ' returns ' + numbers.at(-2))
// An index of -2 returns 40

console.log('CASE locate kale from veggies')

var veggies = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']
var veggie = veggies.at(3)

console.log(veggies)
// (5) ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']
console.log(veggie)
// 4

console.log('CASE locate green from colours using a negative index')

var colours = ['red', 'green', 'blue', 'yellow']
var colour = colours.at(-3)

console.log(colours)
// (4) ['red', 'green', 'blue', 'yellow']
console.log(colour)
// green

console.log('CASE locate Vancouver on cities')

var cities = ['Barcelona', 'Vancouver', 'Karlsruhe', 'Hospitalet']
var city = cities.at(1)

console.log(cities)
// ['Barcelona', 'Vancouver', 'Karlsruhe', 'Hospitalet]
console.log(city)
// Vancouver