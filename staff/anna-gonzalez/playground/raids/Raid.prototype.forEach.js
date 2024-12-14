var Raid = function () {
    this.length = 0
}

Raid.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        callback(element)
    }
}

console.log('TEST Raid.prototype.forEach')

console.log('CASE print characters in Raid')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars.length = 3

chars.forEach(function (char) { console.log(char) })

// "a"
// "b"
// "c"

console.log('CASE sum numbers from Raid')

var numbers = new Raid
numbers[0] = 100
numbers[1] = 200
numbers[2] = 300
numbers.length = 3
var result = 0

numbers.forEach(function (number) { result += number })

console.log(result)
// 600