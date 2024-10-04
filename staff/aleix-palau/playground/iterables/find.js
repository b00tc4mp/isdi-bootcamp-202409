var find = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        if (callback(iterable[i])) {
            return iterable[i]
        }
    }

    return undefined
}

console.log('TEST find')

console.log('CASE return the object\'s first number greater than 10')

var obj1 = {
    0: 5,
    1: 12,
    2: 8,
    3: 130,
    4: 44,
    length: 5
}

var found = find(obj1, function (element) {
    return element > 10
})

console.log(found)
// 12