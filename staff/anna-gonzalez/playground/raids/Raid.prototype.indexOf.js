var Raid = function () {
    this.length = 0
}

Raid.prototype.indexOf = function (element, fromIndex) {
    // Follow the iterable looking for the element
    // If they are the same, return the index of that element
    // If it doesn't find it, return -1
    // If there's a from Index, starting the search from there
    if (!fromIndex) {
        fromIndex = 0
    }
    else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex
    }

    for (var i = fromIndex; i < this["length"]; i++) {
        if (this[i] === element) {
            return i
        }
    }

    return -1
}

console.log('CASE locate the index of the value 8')

var numbers = new Raid
numbers[0] = 2
numbers[1] = 4
numbers[2] = 8
numbers[3] = 16
numbers[4] = 32
numbers[5] = 8
numbers.length = 6

var indexExists = numbers.indexOf(8)
var indexDoesntExist = numbers.indexOf(17)

console.log(indexExists)
// 2
console.log(indexDoesntExist)
// - 1

console.log('CASE locate the index of pingu starting from index 1')

var animals = new Raid
animals[0] = 'pingu'
animals[1] = 'hormiga'
animals[2] = 'delfin'
animals[3] = 'tejon de la miel'
animals[4] = 'pingu'
animals[5] = 8
animals.length = 6

var indexOfPinguFrom = animals.indexOf('pingu', 1)

console.log(indexOfPinguFrom)
// 4

console.log('CASE locate the index of Vancouver with fromIndex and without it')

var cities = new Raid
cities[0] = 'Barcelona'
cities[1] = 'Vancouver'
cities[2] = 'Karlsruhe'
cities[3] = 'Hospitalet'
cities[4] = 'Vancouver'
cities.length = 5

var indexOfVancouver = cities.indexOf('Vancouver')
var indexOfVancouverFrom = cities.indexOf('Vancouver', 2)

console.log(indexOfVancouver)
// 1
console.log(indexOfVancouverFrom)
// 4