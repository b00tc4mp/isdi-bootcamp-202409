console.log('TEST Array.prototype.findIndex')

console.log('CASE returns the index of the array\'s first element greater than 13')

var array1 = [5, 12, 8, 130, 44]

var isLargeNumber = function (element) {
    return element > 13
}

console.log(array1.findIndex(isLargeNumber))
// 3