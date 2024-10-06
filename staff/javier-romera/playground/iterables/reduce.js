var reduce = function (iterable, callback, initial) {
    var result = !initial ? 0 : initial
    for (var i = 0; i < iterable.length; i++) {
        if (!initial && i === 0) { result = callback(iterable[i], 0) }
        else { result = callback(result, iterable[i]) }
    }
    return result
}

console.log('CASE sum all numbers with an initial value of 0')

var numbers = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

var initialValue = 0

var sumWithInitial = reduce(numbers, function (accumulator, currentValue) {
    return accumulator + currentValue
}, initialValue)

console.log(sumWithInitial)
// 10

console.log('CASE sum all numbers with an initial value of 5')

var numbers = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

var initialValue = 5

var sumWithInitial = reduce(numbers, function (accumulator, currentValue) {
    return accumulator + currentValue
}, initialValue)

console.log(sumWithInitial)
// 15

console.log('CASE sum all numbers without initial value')

var numbers = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

var sumWithoutInitial = reduce(numbers, function (accumulator, currentValue) {
    return accumulator + currentValue
})

console.log(sumWithoutInitial)
// 10