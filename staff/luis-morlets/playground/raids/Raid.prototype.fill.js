var Raid = function () {
    this.length = 0
}

Raid.prototype.fill = function (element, startIndex, endIndex) {
    /*
    element -> 0
    startIndex -> 2
    endIndex -> 4
    Insert element from startIndex to endIndex
    return raidFilled  -> {0: 1, 1: 2, 2: 0, 3: 0, length: 4}
    */

    if (endIndex === undefined || endIndex > this.length) {
        endIndex = this.length
    }
    if (startIndex === undefined) {
        startIndex = 0
    }
    for (var i = startIndex; i < endIndex; i++) {
        this[i] = element
    }
    return this
}

console.log('TEST Array.prototype.fill')

console.log('CASE fill 0 from position 2 until position 4')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4
numbers.length = 4

console.log(numbers.fill(0, 2, 4));
// Expected output: Raid: {0: 1, 1: 2, 2: 0, 3: 0, length: 4}

console.log('CASE fill 5 from position 1')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4
numbers.length = 4

console.log(numbers.fill(5));
// Expected output: Raid: {0: 1, 1: 5, 2: 5, 3: 5, length: 4}

console.log('CASE fill 6 from position 0')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4
numbers.length = 4

console.log(numbers.fill(6));
// Expected output: Raid: {0: 6, 1: 6, 2: 6, 3: 6, length: 4}

console.log('CASE when endIndex is greater than this.length')

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4
numbers.length = 4

console.log(numbers.fill(0, 2, 6));
// Expected output: Raid: {0: 1, 1: 2, 2: 0, 3: 0, length: 4}