var shift = function (iterable) {
    var deleted = iterable[0]
    delete iterable[0]
    iterable.length--
    for (i = 0; i < iterable.length; i++) {
        iterable[i] = iterable[i + 1]
        delete iterable[i + 1]
    }
    return deleted
}

console.log('TEST shift')

console.log('CASE check if "cat" is in "pets" array')

var obj1 = { 0: 1, 1: 2, 2: 3, length: 3 }

var firstElement = shift(obj1)

console.log(obj1)
// { 0: 2, 1: 3, length; 2 }

console.log(firstElement)
// 1