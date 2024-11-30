var Raid = function () {
    this.length = 0
}

Raid.prototype.find = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        if (callback(element)) { return element }
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

var found = numbers.find(function (element) {
    return element > 10
})

console.log(found)
// 12

console.log('CASE find agua in strings')

var strings = new Raid
strings[0] = 'awa'
strings[1] = 'aga'
strings[2] = 'awua'
strings[3] = 'agua'
strings.length = 4

var foundString = strings.find(function (thestring) {
    return thestring === 'agua'
})

console.log(foundString)
// agua