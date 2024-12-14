var objectPop = function (iterable) {
    // Extract last element from iterable
    var lastElement = iterable[iterable.length - 1]
    // Delete last element from iterable
    delete iterable[iterable.length - 1]
    // Decrease length from iterable
    iterable.length--
    // Return the last element
    return lastElement
}

console.log('TEST pop')

console.log('CASE extract tomato from veggies')

var veggies = { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato' }
var veggie = objectPop(veggies)

console.log(veggies)
// { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', length: 4 }
console.log(veggie)
// tomato

console.log('CASE extract yellow from colors')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 }
var color = objectPop(colors)

console.log(colors)
// { 0: 'red', 1: 'green', 2: 'blue', length: 3 }
console.log(color)
// yellow

console.log('CASE extract Hospitalet from cities')

var cities = { 0: 'Barcelona', 1: 'Vancouver', 2: 'Karlsruhe', 3: 'Hospitalet', length: 4 }
var city = objectPop(cities)

console.log(cities)
// { 0: 'Barcelona', 1: 'Vancouver', 2: 'Karlsruhe', length: 3 }
console.log(city)
// Hospitalet