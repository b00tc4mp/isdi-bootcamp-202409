var Raid = function () {
    this.length = 0
}

Raid.prototype.reverse = function () {
    var tempObj = new Raid // Instantiate "tempObj" as "new Raid" so that the object returned is also an instance of "Raid" rather than just a plain object.

    for (var i = 0; i < this.length; i++) {
        tempObj[i] = this[this.length - 1 - i]
        tempObj.length++
    }

    for (var i = 0; i < this.length; i++) {
        this[i] = tempObj[i]
    }

    return this
}

console.log('TEST Raid.prototype.reverse')

console.log('CASE reverse obj1')

var obj1 = new Raid
obj1[0] = 'one'
obj1[1] = 'two'
obj1[2] = 'three'
obj1.length = 3

var reversed = obj1.reverse()
console.log(reversed)
// Raid { 0: 'three', 1: 'two', 2: 'one', length: 3 }