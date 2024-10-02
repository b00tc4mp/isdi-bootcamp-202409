var Raid = function () {
    this.length = 0
}

Raid.prototype.findIndex = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        if (callback(element)) { return i }
    }
    return 'no se ha encontrado ningun elemento que cumpla con las características'
}

console.log('TEST Raid.prototype.find')

console.log('CASE find first element bigger than 10 in numbers')

var numbers = new Raid
numbers[0] = 5
numbers[1] = 12
numbers[2] = 8
numbers[3] = 130
numbers[4] = 44
numbers.length = 5

var found = numbers.findIndex(function (element) {
    return element > 10
})

console.log(found)
// 1

console.log('CASE find agua in strings')

var strings = new Raid
strings[0] = 'awa'
strings[1] = 'aga'
strings[2] = 'awua'
strings[3] = 'agua'
strings.length = 4

var foundString = strings.findIndex(function (thestring) {
    return thestring === 'agua'
})

console.log(foundString)
// 3