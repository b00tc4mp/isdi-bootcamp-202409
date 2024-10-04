console.log('TEST Array.prototype.findIndex')

console.log('CASE return index of an element in an array')

var numbers = [5, 12, 8, 130, 44]
var isLargeNumber = function (element) {
    return element > 13
}

console.log(numbers.findIndex(isLargeNumber))