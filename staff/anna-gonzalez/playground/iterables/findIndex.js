var findIndex = function (iterable, callback) {
    for (i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) { return element }
    }
    return "ERROR"
}

console.log('TEST findIndex')

console.log('CASE return index of an element in an iterable')

var numbers = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }
var isLargeNumber = function (element) {
    return element > 13
}

console.log(findIndex(numbers, isLargeNumber))