var Raid = function () {
    this.length = 0
}

Raid.prototype.reverse = function () {
    var reversedRaid = new Raid
    for (var i = this.length - 1; i >= 0; i--) {
        reversedRaid[reversedRaid.length] = this[i]
        reversedRaid.length++
    }
    for (var i = 0; i < reversedRaid.length; i++) {
        this[i] = reversedRaid[i]
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