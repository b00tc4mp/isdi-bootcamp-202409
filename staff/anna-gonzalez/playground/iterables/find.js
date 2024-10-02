var find = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        if (callback(iterable[i])) {
            return iterable[i]
        }
    }
}

console.log('TEST find')

console.log('CASE find first number bigger than 10 in iterable')

var numbers = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

find(numbers, (function (number) { return number > 10 }))
// 12