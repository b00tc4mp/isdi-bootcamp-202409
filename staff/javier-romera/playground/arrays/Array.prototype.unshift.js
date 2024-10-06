console.log('TEST Array.prototype.unshift')

console.log('CASE add [10, 20] to numbers')

var numbers = [1, 2, 3]

console.log(numbers)
// (3) [1, 2, 3]
numbers.unshift([20, 30])
console.log(numbers)
// (4) [[20, 30], 1, 2, 3]

console.log('CASE add barcelona, madrid to cities')

var cities = ['malaga', 'zaragoza', 'valencia']

console.log(cities)
// (3) ['malaga', 'zaragoza', 'valencia']
cities.unshift('barcelona', 'madrid')
console.log(cities)
// (5) ['barcelona', 'madrid', 'malaga', 'zaragoza', 'valencia']