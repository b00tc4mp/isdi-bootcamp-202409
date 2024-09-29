
    //recorrer el iterable en busca del elemento
    //si coinciden, devuelves el indice de ese elemento
    //si no lo encuentra el elemento, retorna -1


var indexOf = function(iterable, element, fromIndex){
    if(!fromIndex){
        fromIndex = 0
    }
    for(var i = fromIndex; i < iterable.length; i++){
        if(iterable[i] === element){
            return i
        }
    }return -1
}


console.log('TEST Array.prototype.indexOf')

console.log('CASE locate the index of the value 8')

var numbers = {
    0: 2,
    1: 4,
    2: 8,
    3: 16,
    4: 32,
    5: 8,
    length:6
}

var index = indexOf(numbers, 8)
console.log(index)
//2

console.log('CASE the value 17 not found')

index = indexOf(numbers, 17)
console.log(index)
//-1





