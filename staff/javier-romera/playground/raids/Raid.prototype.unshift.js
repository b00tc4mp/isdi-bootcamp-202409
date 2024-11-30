var Raid = function () {
    this.length = 0
}

Raid.prototype.unshift = function () {
    for (var i = arguments.length - 1; i >= 0; i--) {
        for (var j = this.length; j >= 0; j--) {
            this[j] = this[j - 1]
        }
        this[0] = arguments[i]
        this.length++
    }
    return this
}

console.log('TEST Raid.prototype.unshift')

console.log('CASE add [10, 20] to numbers')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers.length = 3

console.log(numbers)
// Raid {0: 1, 1: 2, 2: 3, length: 3}
console.log(numbers.unshift([20, 30]))
// Raid {0: Array(2), 1: 1, 2: 2, 3: 3, length: 4}

console.log('CASE add barcelona, madrid to cities')

var cities = new Raid
cities[0] = 'malaga'
cities[1] = 'zaragoza'
cities[2] = 'valencia'
cities.length = 3

console.log(cities)
// Raid {0: 'malaga', 1: 'zaragoza', 2: 'valencia', length: 3}
console.log(cities.unshift('barcelona', 'madrid'))
// Raid {0: 'barcelona', 1: 'madrid', 2: 'malaga', 3: 'zaragoza', 4: 'valencia', length: 5}