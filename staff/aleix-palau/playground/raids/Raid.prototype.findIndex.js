var Raid = function () {
    this.length = 0
}

Raid.prototype.findIndex = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            return i
        }
    }

    return -1
}

console.log('TEST Raid.prototype.findIndex')

console.log('CASE returns the index of the object\'s first element greater than 13')

var obj1 = new Raid
obj1[0] = 5
obj1[1] = 12
obj1[2] = 8
obj1[3] = 130
obj1[4] = 44
obj1.length = 5

var isLargeNumber = function (element) {
    return element > 13
}

console.log(obj1.findIndex(isLargeNumber))
// 3