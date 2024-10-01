//recorrer el array eliminar los primeros n elementos y descontar el length
//{0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5}
//{0: 'b', 1: 'c', 2: 'd', 3: 'e', length: 4}
//{0: 'c', 1: 'd', 2: 'e', length: 3}

var slice = function(iterable, element, end){
    var result = {length:0}
    for(var i = element;
        end > 0 ? i < end 
        : end < 0 ? end + iterable.length 
        : i < iterable.length;
        i++){
        var element = iterable[i]
        result[result.length] = element
        result.length++
    }
    return result
}


console.log('CASE an argument to start the iterable')
var letters = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5}
var result = slice(letters, 2)
console.log(result)
//{0: 'c', 1: 'd', 2: 'e', length: 3}

console.log('CASE an ')

var letters1 = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5}
var result1 = slice(letters1, 2, 4) //4 no inclusive
console.log(result1)
//{0: 'c', 1: 'd', length: 2}

console.log('CASE an argument negative to start the iterable')
var letters = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5}
var result = slice(letters, -2)
console.log(result)
//{0: d, 1: e, length: 2}

