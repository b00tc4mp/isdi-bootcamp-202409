/*
Recorrer de manera inversa el iterable en busca del elemento
En caso de que el elemento no exista devuelve -1
*/

var lastIndexOf = function (iterable, element) {
    for (var i = iterable.length - 1; i >= 0; i--) {
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