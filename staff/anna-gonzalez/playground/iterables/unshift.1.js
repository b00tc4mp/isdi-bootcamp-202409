var unshift = function (iterable, element) {
    // recorrer el iterable desde el final porque tenemos que meterlo al principio
    for (var i = iterable.length; i > -1; i--) {
        // aumentar todos los índices en +1
        iterable[i] = iterable[i - 1]
    }
    // aumentar la length del iterable
    iterable.length++
    // meter el nuevo elemento al principio
    iterable[0] = element
    // return lenght
    return iterable.length
}

console.log('TEST unshift')

console.log('CASE add an element')

var iterable = { 0: 'b', 1: 'c', 2: 'd', length: 3 }
var newLength = unshift(iterable, 'a')

console.log(iterable)
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4]
console.log(newLength)
// 4