var Raid = function () {
    this.length = 0
}

Raid.prototype.fill = function (element, fromIndex, endIndex) {
    if (fromIndex < 0) {
        fromIndex += this.length
    }
    if (endIndex < 0) {
        endIndex += this.length
    }
    for (var i = !fromIndex ? 0 : fromIndex;
        i < (!endIndex ? this.length : endIndex);
        i++) {
        this[i] = element
    }
    return this
}

console.log('TEST Raid.prototype.includes')

console.log('CASE fill entire iterable with 6')

var iterable1 = new Raid
iterable1[0] = 1
iterable1[1] = 2
iterable1[2] = 3
iterable1[3] = 4
iterable1[4] = 5
iterable1.length = 5

console.log(iterable1.fill(6))
// Raid {0: 6, 1: 6, 2: 6, 3: 6, 4: 6, length: 5}

console.log('CASE fill array from a starting position')

console.log(iterable1.fill(5, 3))
// Raid {0: 6, 1: 6, 2: 6, 3: 5, 4: 5, length: 5}

console.log('CASE fill array from a starting position to an end position')

console.log(iterable1.fill(9, 1, 3))
// Raid {0: 6, 1: 9, 2: 9, 3: 5, 4: 5, length: 5}