var Raid = function () {
    this.length = 0
}

Raid.prototype.map = function (callback) {
    var newRaid = { length: 0 }

    for (var i = 0; i < this.length; i++) {
        newRaid[i] = callback(this[i])
        newRaid.length++
    }

    return newRaid
}

console.log('TEST Raid.prototype.map')

console.log('CASE multiply numbers in Raid')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 4
numbers[2] = 9
numbers[3] = 16
numbers.length = 4

numbers.map(function (number) { return number * 2 })
// {0: 2, 1: 8, 2: 18, 3: 32, length: 4}

console.log('CASE return first letter of names in Raid')

var names = new Raid
names[0] = 'Javier'
names[1] = 'Claudi'
names[2] = 'Aaron'
names[3] = 'Emiliano'
names.length = 4

names.map(function (name) { return name[0] })
// {0: 'J', 1: 'C', 2: 'A', 3: 'E', length: 4}