/*
Recorrer de manera inversa el iterable en busca del elemento
En caso de que el elemento no exista devuelve -1
Agregar nuevo argumento fromIndex(positivo) y buscar el elemento recorriendo el iterable
*/

var lastIndexOf = function (iterable, element, fromIndex) {
    for (var i = (fromIndex === undefined ? iterable.length - 1
        : fromIndex < 0 ? fromIndex + iterable.length
            : fromIndex);
        i > -1;
        i--) {
        if (iterable[i] === element) {
            return i
        }
    }
    return -1
}

console.log('TEST Array.prototype.lastIndexOf')

console.log('CASE extract last index of the element')

var numbers = { 0: 2, 1: 5, 2: 9, 3: 2, length: 4 };
var index = lastIndexOf(numbers, 2);
console.log(index)
//3

console.log('CASE extract last index of an element not in the array')

var numbers = { 0: 2, 1: 5, 2: 9, 3: 2, length: 4 };
var index = lastIndexOf(numbers, 7);
console.log(index)
//-1

console.log('CASE extract last index of the element using a positive fromIndex')

var numbers = { 0: 2, 1: 5, 2: 9, 3: 2, length: 4 };
var index = lastIndexOf(numbers, 2, 2);
console.log(index)
//0

console.log('CASE extract last index of the element using a negative fromIndex')

var numbers = { 0: 2, 1: 5, 2: 9, 3: 2, length: 4 };
var index = lastIndexOf(numbers, 2, -1);
console.log(index)
//3