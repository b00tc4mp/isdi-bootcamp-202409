var at = function (iterable, index) {
    if (index < -iterable.length || index >= iterable.length) {
        return "Fuera de indice"
    } else if (index < 0) {
        return iterable[Math.ceil(index) + iterable.length]
    }
    else {
        return iterable[Math.floor(index)]
    }
}

console.log('TEST at')

console.log('CASE locate index 2 on numbers')

var numbers = { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, length: 5 }
var number = at(numbers, 2)

console.log(numbers)
// (5) {0: 10, 1: 20, 2: 30, 3: 40, 4: 50}
console.log(number)
// 30

console.log('CASE locate index -1 on cities')

var cities = { 0: 'barcelona', 1: 'madrid', 2: 'valencia', length: 3 }
var city = at(cities, -1)

console.log(cities)
// (3) {0: 'barcelona', 1: 'madrid', 2: 'valencia'}
console.log(city)
// valencia