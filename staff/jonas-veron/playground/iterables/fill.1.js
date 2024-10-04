//Recorrer el iterable
//reemplazar el valor de cada indice por el elemento manteniendo la longitud del objeto

var fill = function (iterable, elemento) {
    for (var i = 0; i < iterable.length; i++){
        iterable[i] = elemento
    }
    return iterable
}

console.log('CASE fill the whole array with letter x')

var obj = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }
var newObject = fill(obj, 'x')
console.log(newObject);
//{0: 'x', 1: 'x', 2: 'x', 3:'x', length: 4}