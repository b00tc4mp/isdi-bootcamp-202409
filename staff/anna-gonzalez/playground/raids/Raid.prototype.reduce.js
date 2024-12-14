Raid = function () {
    this.length = 0
}

Raid.prototype.reduce = function (callback) {
    var result = initialValue
    for (var i = 0; i < this.length; i++) {
        result = callback(result, this[i])
    }
    return result
}

console.log('TEST Raid.prototype.reduce')

console.log('CASE sum the numbers with initial value 0')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4
numbers.length = 4

var initialValue = 0

var sumWithInitial = numbers.reduce(function (accumulator, currentValue) { return accumulator + currentValue }, initialValue)

console.log(sumWithInitial)
// 10