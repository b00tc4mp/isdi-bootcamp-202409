var unshift = function (iterable) {
    for (var i = arguments.length - 2; i >= 0; i--) {
        for (var j = iterable.length; j >= 0; j--) {
            iterable[j] = iterable[j - 1]
        }
        iterable[0] = arguments[i + 1]
        iterable.length++
    }
    return iterable
}

console.log('TEST unshift')

console.log('CASE add [10, 20] to numbers')

var numbers = { 0: 1, 1: 2, 2: 3, length: 3 }

console.log(numbers)
// {0: 1, 1: 2, 2: 3, length: 3}
console.log(unshift(numbers, [20, 30]))
// {0: [20, 30], 1: 1, 2: 2, 3: 3, length: 4}

console.log('CASE add barcelona, madrid to cities')

var cities = { 0: 'malaga', 1: 'zaragoza', 2: 'valencia', length: 3 }

console.log(cities)
// (3) {0: 'malaga', 1: 'zaragoza', 2: 'valencia', length: 3}
console.log(unshift(cities, 'barcelona', 'madrid'))
// (5) {0: 'barcelona', 1: 'madrid', 2: 'malaga', 3: 'zaragoza', 4: 'valencia', length: 5}