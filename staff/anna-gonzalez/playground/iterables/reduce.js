var reduce = function (iterable, callback, initialValue) {
    var result = initialValue
    for (var i = 0; i < iterable.length; i++) {
        result = callback(result, iterable[i])
    }
    return result
}

console.log('TEST reduce')

console.log('CASE sum the numbers with initial value 0')

var numbers = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

var initialValue = 0

var sumWithInitial = reduce(numbers, function (accumulator, currentValue) { return accumulator + currentValue }, initialValue)

console.log(sumWithInitial)
// 10