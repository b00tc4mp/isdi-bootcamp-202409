Raid = function () {
    this.length = 0
}

Raid.prototype.findIndex = function (callback) {
    for (i = 0; i < this.length; i++) {
        var element = this[i]
        if (callback(element)) { return element }
    }
    return "ERROR"
}

console.log('TEST Raid.prototype.findIndex')

console.log('CASE return index of an element in a Raid')

var numbers = new Raid
numbers[0] = 5
numbers[1] = 12
numbers[2] = 8
numbers[3] = 130
numbers[4] = 44
numbers.length = 5

numbers.findIndex(function (element) { return element > 13 })
// 130