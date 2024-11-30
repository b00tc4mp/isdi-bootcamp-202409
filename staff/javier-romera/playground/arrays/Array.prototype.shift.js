console.log('TEST Array.prototype.shift')

console.log('CASE remove 1 from numbers')

var numbers = [1, 2, 3, 4, 5]
var removedNumber = numbers.shift()

console.log(numbers)
// (4) [2, 3, 4, 5]
console.log(removedNumber)
// 1

console.log('CASE remove barcelona from cities')

var cities = ['barcelona', 'madrid', 'bilbao']
var removedCity = cities.shift()

console.log(cities)
// (2) ['madrid', 'bilbao']
console.log(removedCity)
// barcelona