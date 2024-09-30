// Recorrer el iterable en usca del elemento
// Si coinciden, devuelves el índice de ese elemento
// Si no lo encuentra, devuelve '-1'
// Si existe el argumento fromIndex, empezar la busqueda a partir del mismo

var indexOf = function (iterable, element, fromIndex = 0) {
    if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }
    for (var i = fromIndex; i < iterable.length; i++) {
        if (iterable[i] === element) {
            return i
        }
    } return -1
}

// console.log('CASE find the first index at which a given element can be found in the array, or -1 if it is not present.')

const beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 };

console.log(indexOf(beasts, 'bison'))
// console.log(indexOf(beasts, 'bison'))
// Expected output: 1

console.log(indexOf(beasts, 'bison', 2))
// Start from index 2
// console.log(indexOf(beasts, 'bison', 2))
// Expected output: 4

console.log(indexOf(beasts, 'giraffe'))
// console.log(indexOf(beasts, 'giraffe'))
// Expected output: -1