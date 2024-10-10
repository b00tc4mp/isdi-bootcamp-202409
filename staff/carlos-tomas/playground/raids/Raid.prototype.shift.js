var Raid = function () {
    this.length = 0
}

Raid.prototype.shift = function () {
    var deleted = this[0]
    delete this[0]
    this.length--
    for (i = 0; i < this.length; i++) {
        this[i] = this[i + 1]
        delete this[i + 1]
    }
    return deleted
}

console.log('TEST Raid.prototype.js')

console.log('CASE check if "cat" is in "pets" array')

var obj1 = new Raid
obj1[0] = 1
obj1[1] = 2
obj1[2] = 3
obj1.length = 3


var firstElement = obj1.shift()

console.log(obj1)
// { 0: 2, 1: 3, length; 2 }

console.log(firstElement)
// 1