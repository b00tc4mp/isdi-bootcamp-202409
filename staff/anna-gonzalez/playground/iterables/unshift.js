var unshift = function (iterable) {
    for (var j = arguments.length - 1; j > 0; j--) {
        for (var i = iterable.length; i > -1; i--) {
            iterable[i] = iterable[i - 1]
        }
        iterable[0] = arguments[j]
        iterable.length++
    }
    return iterable.length
}

console.log('TEST unshift')

console.log('CASE add two elements')

var iterable = { 0: 'b', 1: 'c', 2: 'd', length: 3 }
var newLength = unshift(iterable, 'a', 'A')

console.log(iterable)
// { 0: 'a', 1: 'A', 2: 'b', 3: 'c', 4: 'd', length: 5 }
console.log(newLength)
// 5