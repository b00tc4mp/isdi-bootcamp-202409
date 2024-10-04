//recorrer de manera inversa el iterable en busca del elemento

var lastIndexOf = function (iterable, element) {
    for (var i = iterable.length - 1; i < iterable.length; i--) {
        if (iterable[i] === element) {
            return i
        }
    }
}

console.log('TEST Array.prototype.lastIndexOf')

console.log('CASE extract last index of the element')

var numbers = { 0: 2, 1: 5, 2: 9, 3: 2, length: 4 };
var index = lastIndexOf(numbers, 2);
console.log(index)
//3

