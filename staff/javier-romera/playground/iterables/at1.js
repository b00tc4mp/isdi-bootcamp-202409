var at = function (iterable, index) {
    return index < -iterable.length || index >= iterable.length ? 'out of index' : (index > 0 ? iterable[index] : iterable[index + iterable.length])
}

console.log('TEST at')

console.log('CASE locate index 2 on numbers')

var numbers = { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, length: 5 }
var number = at(numbers, 2)

console.log(numbers)
// { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, length: 5 }
console.log(number)
// 30

console.log('CASE locate index -1 on cities')

var cities = { 0: 'barcelona', 1: 'madrid', 2: 'valencia', length: 3 }
var city = at(cities, -1)

console.log(cities)
// {0: 'barcelona', 1: 'madrid', 2: 'valencia', length: 3}
console.log(city)
// valencia

console.log('CASE locate index 100 on cities')

var cities = { 0: 'barcelona', 1: 'madrid', 2: 'valencia', length: 3 }
var city = at(cities, 100)

console.log(cities)
// {0: 'barcelona', 1: 'madrid', 2: 'valencia', length: 3}
console.log(city)
// out of index