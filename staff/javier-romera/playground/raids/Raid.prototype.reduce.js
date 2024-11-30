var Raid = function () {
    this.length = 0
}

Raid.prototype.reduce = function (callback, initial) {
    var result = !initial ? 0 : initial
    for (var i = 0; i < this.length; i++) {
        if (!initial && i === 0) { result = callback(this[i], 0) }
        else { result = callback(result, this[i]) }
    }
    return result
}

console.log('TEST Raid.prototype.reduce')

console.log('CASE sum all numbers with an initial value of 0')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4
numbers.length = 4

var initialValue = 0

var sumWithInitial = numbers.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue
}, initialValue)

console.log(sumWithInitial)
// 10

console.log('CASE sum all numbers with an initial value of 5')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4
numbers.length = 4

var initialValue = 5

var sumWithInitial = numbers.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue
}, initialValue)

console.log(sumWithInitial)
// 15

console.log('CASE sum all numbers without initial value')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4
numbers.length = 4

var sumWithoutInitial = numbers.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue
})

console.log(sumWithoutInitial)
// 10