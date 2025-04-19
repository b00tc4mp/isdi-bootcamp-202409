console.log('TEST Array.prototype.at')

console.log('CASE locate index 2 on numbers')

var numbers = [10, 20, 30, 40, 50]
var number = numbers.at(2)

console.log(numbers)
// (5) [10,20,30,40,50]
console.log(number)
// 30

console.log('CASE locate index -1 on cities')

var cities = ['barcelona', 'madrid', 'valencia']
var city = cities.at(-1)

console.log(cities)
// (3) ['barcelona', 'madrid', 'valencia']
console.log(city)
// valencia

console.log('CASE locate index 100 on cities')

var cities = ['barcelona', 'madrid', 'valencia']
var city = cities.at(100)

console.log(cities)
// (3) ['barcelona', 'madrid', 'valencia']
console.log(city)
// valencia