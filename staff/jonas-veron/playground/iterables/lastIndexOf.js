//agregar otro parametro fromIndex, y buscar el elemento recorriendo el iterable

var lastIndexOf = function(iterable, elemento, fromIndex){
    for (var i = (fromIndex === undefined ? iterable.length-1
        : fromIndex < 0 ? fromIndex+iterable.length
        : fromIndex);
        i >= 0;
        i--){
        if(iterable[i] === elemento){
            return i
        }
    }
    return -1
}


console.log('TEST array.prototype.lastIndexOf')

console.log('CASE extract the index of the element')

var array = {0: 2, 1: 5, 2: 9, 3: 2, length:4};
var index = lastIndexOf(array, 2)
console.log(index)
//3


console.log('CASE cuando el elemento no se encuentra')

var array = {0: 2, 1: 5, 2: 9, 3: 2, length:4};
var index1 = lastIndexOf(array, 7)
console.log(index1)
//-1


console.log('CASE devuelve el indice del elemento desde un fromIndex')

var array = {0: 2, 1: 5, 2: 9, 3: 2, length:4};
var index2 = lastIndexOf(array, 2, 3); // 3
console.log(index2)
//3

console.log('CASE devuelve el indice del elemento desde un fromIndex negativo')

var array = {0: 2, 1: 5, 2: 9, 3: 2, length:4};
var index3 = lastIndexOf(array, 2, -1)
console.log(index3)
//3

var array = {0: 2, 1: 5, 2: 9, 3: 2, length:4};
var index4 = lastIndexOf(array, 2, 2); // 0
console.log(index4)
