//recorrer el iterable en busca del elemento de manera inversa
//


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

