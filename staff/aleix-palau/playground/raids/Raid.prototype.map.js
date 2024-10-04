var Raid = function () { this.length = 0 }

Raid.prototype.map = function (callback) {
    var obj = new Raid

    for (var i = 0; i < this.length; i++) {
        obj[i] = callback(this[i])
        obj.length++
    }

    return obj
}

console.log('TEST Raid.prototype.map')

console.log('CASE multiply the object times 2')

var obj1 = new Raid
obj1[0] = 1
obj1[1] = 4
obj1[2] = 9
obj1[3] = 16
obj1.length = 4

// Pass a function to map
var map1 = obj1.map(function (num) {
    return num * 2
})

console.log(map1);
// Raid { 0: 2, 1: 8, 2: 18, 3: 32, length: 4 }