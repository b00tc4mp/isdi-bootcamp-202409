//

var concat = function(iterable, iterable2){
    var result = iterable
    for (var i = 0; i < iterable2.length; i++){
        result[result.length] = iterable2[i]
        result.length++
    }
    return result
}


console.log('TEST Array.prototype.concat')

console.log('CASE concat an array to two arrays')


var letters= {0: 'a', 1: 'b', 2: 'c', length: 3}
var numbers = {0: 1, 1: 2, 2: 3, length: 3}



var iterable = concat(letters, numbers)
console.log(iterable)
//{0:'a',1: 'b',2: 'c', 3:1, 4: 2, 5: 3, length: 6}