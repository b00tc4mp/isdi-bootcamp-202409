var indexOf = function (iterable, searchElement, fromIndex) {
    if (fromIndex === undefined) {
        fromIndex = 0;
    } else if (fromIndex < 0)
        fromIndex = fromIndex + iterable.length;

    for (var i = fromIndex; i < iterable.length; i++) {
        var element = iterable[i]

        if (element === searchElement) return i
    }

    return -1

}
console.log('TEST indexOf')

console.log('CASE get index of c')

var chars = { 0: 'a', 1: 'b', 2: 'c', 3: 'b', 4: 'a', length: 5 }

var index = indexOf(chars, 'c')
console.log(index)
// 2

console.log('CASE get index of c from index -2')

var chars = { 0: 'a', 1: 'b', 2: 'c', 3: 'b', 4: 'a', length: 5 }

var index = indexOf(chars, 'c', -2)
console.log(index)
// -1