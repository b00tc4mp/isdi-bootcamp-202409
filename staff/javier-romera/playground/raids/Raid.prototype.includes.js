var Raid = function () {
    this.length = 0
}

Raid.prototype.includes = function (searchElement, fromIndex) {
    if (fromIndex < -this.length || fromIndex >= this.length) {
        return false
    }

    if (!fromIndex) {
        fromIndex = 0;
    }
    else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex
    }
    for (fromIndex; fromIndex < this.length; fromIndex++) {
        if (this[fromIndex] === searchElement) {
            return true
        }
    }
    return false
}

console.log('TEST Raid.prototype.includes')

console.log('CASE numbers includes 2')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers.length = 3

var numbersIncludes = numbers.includes(2)

console.log(numbers)
// Raid {0: 1, 1: 2, 2: 3, length: 3}
console.log(numbersIncludes)
// true

console.log('CASE animals includes cat')

var animals = new Raid
animals[0] = 'cat'
animals[1] = 'dog'
animals[2] = 'bat'
animals.length = 3

var animalsIncludes1 = animals.includes('cat')

console.log(animals)
// Raid {0: 'cat', 1: 'dog', 2: 'bat', length: 3}
console.log(animalsIncludes1)
// true

console.log('CASE animals includes unicorn')

var animalsIncludes2 = animals.includes('unicorn')

console.log(animals)
// Raid {0: 'cat', 1: 'dog', 2: 'bat', length: 3}
console.log(animalsIncludes2)
// false