var unshift = function (iterable) {
    // go through arguments backwards excluding iterable
    for (var j = arguments.length - 1; j > 0; j--) {
        // go through iterable backwards
        for (var i = iterable.length; i > -1; i--) {
            // move each element one position to the right
            iterable[i] = iterable[i - 1]
        }
        // assign the element you want to add
        iterable[0] = arguments[j]
        // increase the length of the iterable
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