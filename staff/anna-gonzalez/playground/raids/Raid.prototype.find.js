var Raid = function () {
    this.length = 0
}

Raid.prototype.find = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            return this[i]
        }
    }
}

console.log('TEST Raid.prototype.find')

console.log('CASE find first number bigger than 10 in Raid')

var numbers = new Raid
numbers[0] = 5
numbers[1] = 12
numbers[2] = 8
numbers[3] = 130
numbers[4] = 44
numbers.length = 5

numbers.find(function (number) { return number > 10 })