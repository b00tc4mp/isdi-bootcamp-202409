var Raid = function () {
    this.length = 0
}

Raid.prototype.fill = function (value, start, end) {
    for (var i = (start === undefined ? 0 : start); i < (end === undefined ? this.length : end); i++) {
        this[i] = value
    }

    return this
}

console.log('TEST Raid.prototype.fill')

console.log('CASE fill the object with 6')

var obj1 = new Raid
obj1[0] = 1
obj1[1] = 2
obj1[2] = 3
obj1[3] = 4
obj1.length = 4

console.log(obj1.fill(6))
// Raid { '0': 6, '1': 6, '2': 6, '3': 6, length: 4 }

console.log('CASE fill the object with 5 starting from index 1')

var obj1 = new Raid
obj1[0] = 1
obj1[1] = 2
obj1[2] = 3
obj1[3] = 4
obj1.length = 4

console.log(obj1.fill(5, 1))
// Raid { '0': 1, '1': 5, '2': 5, '3': 5, length: 4 }

console.log('CASE fill the object with 0 starting from index 1 and ending at index 4 exclusive')

var obj1 = new Raid
obj1[0] = 1
obj1[1] = 2
obj1[2] = 3
obj1[3] = 4
obj1.length = 4

console.log(obj1.fill(0, 2, 4))
// Raid { '0': 1, '1': 2, '2': 0, '3': 0, length: 4 }