var Raid = function () {
    this.length = 0
}

Raid.prototype.map = function (callback) {
    var newRaid = new Raid
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        newRaid[i] = callback(element)
        newRaid.length++
    }
    return newRaid
}

console.log('TEST Raid.prototype.map')

console.log('CASE multiply by 2')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4
numbers[4] = 5
numbers.length = 5

var newNumbers = numbers.map(function (num) {
    return num * 2
})

console.log(newNumbers)
// Raid {0: 2, 1: 4, 2: 6, 3: 8, 4: 10, length: 5}

console.log('CASE add zzz to string')

var stuff = new Raid
stuff[0] = 'hola'
stuff[1] = 'que'
stuff[2] = 'tal'
stuff.length = 3

var newStuff = stuff.map(function (thestring) {
    return thestring + 'zzz'
})

console.log(newStuff)
// Raid {0: 'holazzz', 1: 'quezzz', 2: 'talzzz', length: 3}