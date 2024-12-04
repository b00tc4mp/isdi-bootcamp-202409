var findIndex = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        if (callback(iterable[i])) {
            return i
        }
    }

    return -1
}

console.log('TEST findIndex')

console.log('CASE returns the index of the object\'s first element greater than 13')

var obj1 = {
    0: 5,
    1: 12,
    2: 8,
    3: 130,
    4: 44,
    length: 5
}

var isLargeNumber = function (element) {
    return element > 13
}

console.log(findIndex(obj1, isLargeNumber))
// 3