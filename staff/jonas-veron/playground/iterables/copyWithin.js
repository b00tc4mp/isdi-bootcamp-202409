console.log('TEST copyWithin method in object')
//1er indice es donde se insertara el/los elem copiados
//2on a partir de cual empieza a copiar elem si es negativo, se cuenta desde el final( por defecto es 0)
//3er hasta donde se copia(no inclusive) si es negativo, se cuenta desde el final. por defecto es la longitud del array

//{0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5}


var copyWithin = function(iterable, target){
    var result = {length:0}
    for(var i = 0; i < iterable.length; i++){
        var element = iterable[i]
        result[result.length] = element
    }
}





console.log('CASE copy with one element')

var array = {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5}
copyWithin(array, -2)
//{0: 1, 1: 2, 2: 3, 3: 1, 4: 2, length: 5}





console.log('CASE Copy to index 0 the element at index 3')

const array1 = ['a', 'b', 'c', 'd', 'e']

console.log(array1.copyWithin(0, 3, 4));
// ["d", "b", "c", "d", "e"]