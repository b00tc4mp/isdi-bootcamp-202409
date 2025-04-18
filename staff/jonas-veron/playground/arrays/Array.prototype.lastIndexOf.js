//recorrer el iterable en busca del elemento desde el final
//si coinciden, devuelves el indice del elemento
//si no encuentra el elemento, retorna -1

console.log('TEST array.prototype.lastIndexOf')

console.log('CASE extract the index of the element')

var array = [2, 5, 9, 2];
var index = array.lastIndexOf(2)
console.log(index)
//3

console.log('CASE cuando el elemento no se encuentra')

var array = [2, 5, 9, 2];
var index1 = array.lastIndexOf(7)
console.log(index1)
//-1

console.log('CASE devuelve el indice del elemento desde un fromIndex')

var array = [2, 5, 9, 2];
var index2 = array.lastIndexOf(2, 3); // 3
console.log(index2)
//3

console.log('CASE devuelve el indice del elemento desde fromIndex negativo')

var array = [2, 5, 9, 2];
var index3 = array.lastIndexOf(2, -1); // 3
console.log(index3)
//3


