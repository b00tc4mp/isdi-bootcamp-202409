var Raid = function () {
    this.length = 0
}

Raid.prototype.shift = function () {
    var element = this[0]
    delete this[0]
    for (var i = 1; i < this.length; i++) {
        this[i - 1] = this[i]
    }
    this.length--
    delete this[this.length]
    return element
}

console.log('TEST Raid.prototype.shift')

console.log('CASE extract 1 from Raid')

var iterable = new Raid
iterable[0] = 1
iterable[1] = 2
iterable[2] = 3
iterable.length = 3

var firstElement = iterable.shift()

console.log(iterable)
// {0: 2, 1: 3, length: 2}
console.log(firstElement)
// 1

console.log('CASE extract barcelona from Raid')

var cities = new Raid
cities[0] = 'barcelona'
cities[1] = 'cuenca'
cities[2] = 'hospitalet'
cities[3] = 'girona'
cities[4] = 'vancouver'
cities.length = 5

var firstElement = cities.shift()

console.log(cities)
// {0: 'cuenca', 1: 'hospitalet', 2: 'girona', 3: 'vancouver', length: 4}
console.log(firstElement)
// barcelona

console.log('CASE extract element from empty Raid')

var spaceEmpty = new Raid
spaceEmpty.length = 0

var firstElement = spaceEmpty.shift()

console.log(spaceEmpty)
console.log(firstElement)