 //EN CASO DE QUE EL ELEMENTO NO EXISTA, DEVOLVER UN -1


var lastIndexOf = function(iterable, elemento){
    for (var i = iterable.length-1; i >= 0; i--){
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
