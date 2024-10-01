var Raid = function () {
    this.length = 0
}

Raid.prototype.indexOf = function (element, fromIndex) {
    for (
        var i = (arguments.length === 1 ? 0 : (fromIndex >= 0 ? fromIndex : fromIndex + this.length));
        i < this["length"];
        i++
    ) {
        if (this[i] === element) {
            return i;
        }
    }
    return -1;
}

console.log("TEST Raid.prototype.indexOf")

console.log("CASE locate the index of the value 8")

var numbers = new Raid
numbers[0] = 2
numbers[1] = 4
numbers[2] = 8
numbers[3] = 16
numbers[4] = 32
numbers[5] = 8
numbers.length = 6

var index = numbers.indexOf(8);
console.log(index);
// 2

console.log("CASE value 17 not found");
var numbers = new Raid
numbers[0] = 2
numbers[1] = 4
numbers[2] = 8
numbers[3] = 16
numbers[4] = 32
numbers[5] = 8
numbers.length = 6
var index = numbers.indexOf(17);
console.log(index);
// -1

console.log("CASE locate the index of the second value 8");
var numbers = new Raid
numbers[0] = 2
numbers[1] = 4
numbers[2] = 8
numbers[3] = 16
numbers[4] = 32
numbers[5] = 8
numbers.length = 6
var index = numbers.indexOf(8, 3);
console.log(index);
// 5

console.log("CASE locate the index from a negative value")
var numbers = new Raid
numbers[0] = 2
numbers[1] = 4
numbers[2] = 8
numbers[3] = 16
numbers[4] = 32
numbers[5] = 8
numbers.length = 6
var index = numbers.indexOf(4, -6);
console.log(index);
// 1
