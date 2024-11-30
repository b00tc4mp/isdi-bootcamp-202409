var Raid = function () {
    this.length = 0
}

Raid.prototype.reverse = function () {
    for (var i = 0; i < Math.floor(this.length / 2); i++) {
        var element = this[this.length - 1 - i]
        this[this.length - 1 - i] = this[i]
        this[i] = element
    }
    return this
}

console.log('TEST Raid.prototype.reverse')

console.log('CASE reverse numbers')

var numbers = new Raid
numbers[0] = 'one'
numbers[1] = 'two'
numbers[2] = 'three'
numbers[3] = 'four'
numbers[4] = 'five'
numbers.length = 5

console.log(numbers)
// Raid {0: 'one', 1: 'two', 2: 'three', 3: 'four', 4: 'five', length: 5}

var reversed = numbers.reverse()

console.log(reversed)
// Raid {0: 'five', 1: 'four', 2: 'three', 3: 'two', 4: 'one', length: 5}