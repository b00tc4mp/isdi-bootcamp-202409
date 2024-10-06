var Raid = function () {
    this.length = 0
}

Raid.prototype.shift = function () {
    var firstElement = this[0]
    delete this[0]
    for (var i = 1; i < this.length; i++) {
        this[i - 1] = this[i]
    }
    this.length--
    delete this[this.length] //borrar la posición que nos sobra por la cola del iterable
    return firstElement
}

console.log('TEST Raid.prototype.shift')

console.log('CASE remove 1 from numbers')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4
numbers[4] = 5
numbers.length = 5

var removedNumber = numbers.shift()

console.log(numbers)
// Raid {0: 2, 1: 3, 2: 4, 3: 5, length: 4}
console.log(removedNumber)
// 1

console.log('CASE remove barcelona from cities')

var cities = new Raid
cities[0] = 'barcelona'
cities[1] = 'madrid'
cities[2] = 'bilbao'
cities.length = 3

var removedCity = cities.shift()

console.log(cities)
// Raid {0: 'madrid', 1: 'bilbao', length: 2}
console.log(removedCity)
// barcelona