var map = function (iterable, callback) {
    var newIterable = { length: 0 }

    for (var i = 0; i < iterable.length; i++) {
        newIterable[i] = callback(iterable[i])
        newIterable.length++
    }

    return newIterable
}

console.log('TEST map')

console.log('CASE multiply numbers in iterable')

var numbers = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 }

map(numbers, (function (number) { return number * 2 }))
// {0: 2, 1: 8, 2: 18, 3: 32, length: 4}

console.log('CASE return first letter of names in iterable')

var names = { 0: 'Javier', 1: 'Claudi', 2: 'Aaron', 3: 'Emiliano', length: 4 }

map(names, (function (name) { return name[0] }))
// {0: 'J', 1: 'C', 2: 'A', 3: 'E', length: 4}