var Raid = function () {
    this.length = 0
}

Raid.prototype.unshift = function () {
    for (var j = arguments.length - 1; j > -1; j--) {
        for (var i = this.length; i > -1; i--) {
            this[i] = this[i - 1]
        }
        this[0] = arguments[j]
        this.length++
    }
    return this.length
}

console.log('TEST Raid.prototype.unshift')

console.log('CASE add two elements')

var letters = new Raid
letters[0] = 'b'
letters[1] = 'c'
letters[2] = 'd'
letters.length = 3

var newLength = letters.unshift('a', 'A')

console.log(letters)
console.log(newLength)