var Raid = function () {
    this.length = 0
}

Raid.prototype.find = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            return this[i]
        }
    }

    return undefined
}

console.log('TEST Raid.prototype.find')

console.log('CASE return the object\'s first number greater than 10')

var obj1 = new Raid
obj1[0] = 5
obj1[1] = 12
obj1[2] = 8
obj1[3] = 130
obj1[4] = 44
obj1.length = 5

var found = obj1.find(function (element) {
    return element > 10
})

console.log(found)
// 12