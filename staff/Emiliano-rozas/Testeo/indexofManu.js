var indexOf = function (iterable, searchElement, fromIndex) {
    /*
    iterate on iterable
    if searchElement found then return index
    otherwise return -1
    */

    /*
    iterate on iterable from index fromIndex
    if searchElement found then return index
    otherwise return -1
    */

    for (
        var i = (arguments.length === 2 ? 0 : (fromIndex >= 0 ? fromIndex : fromIndex + iterable.length));
        i < iterable.length;
        i++
    ) {
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