console.log('TEST findIndex method in object')
//retorna un indice si la condicion es verdadera

var findIndex = function(iterable, callback){
    for (var i = 0; i < iterable.length; i++){
        var element = iterable[i]
        if(callback(element))
            return i
    }
return -1
}

console.log('find the first element that matched and return the index')

var numbers = {
    0: 5,
    1: 12,
    2: 8,
    3: 130,
    4: 44,
    length: 5
}

var printIndex = function(num){
    return num > 13
}

var result = findIndex(numbers, printIndex)
console.log(result)
//3