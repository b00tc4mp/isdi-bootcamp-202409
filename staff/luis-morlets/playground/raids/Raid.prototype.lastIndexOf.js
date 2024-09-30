var Raid = function () {
    this.length = 0
}

Raid.prototype.lastIndexOf = function (searchElement, fromIndex) {
    if (fromIndex === undefined) {
        fromIndex = this.length - 1
    } else if (fromIndex >= 0) {
        fromIndex = fromIndex
    } else {
        fromIndex = fromIndex + this.length
    }
    for (var i = fromIndex; i >= 0; i--) {

        if (this[i] === searchElement) {
            return i
        }
    }
    return -1
}




console.log('TEST Raid.prototype.lastIndexOf')

console.log('CASE extract last index of the element')

var numbers = new Raid
numbers[0] = 2
numbers[1] = 5
numbers[2] = 9
numbers[3] = 2
numbers.length = 4


var index = numbers.lastIndexOf(2);
console.log(index)
//3