//

var concat = function () {
    var result = { length: 0 }
    for (var j = 0; j < arguments.length; j++) {
        for (var i = 0; i < arguments[j].length; i++) {
            result[result.length] = arguments[j][i]
            result.length++
        }
    }
    return result
}


console.log('TEST Array.prototype.concat')

console.log('CASE concat an array to two arrays')


var letters = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var numbers = { 0: 1, 1: 2, 2: 3, length: 3 }



var iterable = concat(letters, numbers)
console.log(iterable)
//{0:'a',1: 'b',2: 'c', 3:1, 4: 2, 5: 3, length: 6}

console.log('CASE concat three iterables')

var letters = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var numbers = { 0: 1, 1: 2, 2: 3, length: 3 }
var names = { 0: 'juan', 1: 'pepito', 2: 'angel', 3: 'rafa', length: 4 }

var total = concat(letters, numbers, names)

console.log(total)



//{0: 'a', 1: 'b', 2: 'c', 3: 1, 4: 2, 5: 3, 6: 'juan', 7: 'pepito', 8: 'angel', 9: 'rafa', length: 10}