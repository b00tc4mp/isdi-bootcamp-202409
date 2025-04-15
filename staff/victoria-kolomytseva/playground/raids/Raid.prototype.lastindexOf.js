console.log('Raid.prototype.lastindexOf')

console.log('Case extract last index of the element')

Raid.prototype.lastindexOf = function (searvhElement, fromIndex) {

    if (fromIndex === undefind) {
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


var numbers = new Raid
numbers[0] = 2
numbers[1] = 5
numbers[2] = 9
numbers[3] = 2
numbers.length = 4

var index = numbers.lastindexOf(2)
console.log(index)
//3