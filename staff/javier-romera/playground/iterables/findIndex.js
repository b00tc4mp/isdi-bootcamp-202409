var findIndex = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) { return i }
    }
    return 'no se ha encontrado ningun elemento que cumpla con las características'
}

console.log('TEST find')

console.log('CASE find first element bigger than 10 in numbers')

var numbers = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

var found = findIndex(numbers, function (element) {
    return element > 10
})

console.log(found)
// 1

console.log('CASE find agua in strings')

var strings = { 0: 'awa', 1: 'aga', 2: 'awua', 3: 'agua', length: 4 }

var foundString = findIndex(strings, function (thestring) {
    return thestring === 'agua'
})

console.log(foundString)
// 3