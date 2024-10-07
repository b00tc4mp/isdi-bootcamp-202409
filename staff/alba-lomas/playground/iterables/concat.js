


var concat = function () {
    var result = { length: 0 }

    for (var j = 0; j < arguments.length; j++) {
        var iterableX = arguments[j]

        for (var i = 0; i < iterableX.length; i++) {
            var element = iterableX[i]

            result[result.length] = element
            result.length++
        }
    }

    return result
}


console.log('TEST concat')

console.log('CASE concat 2 iterables of characters')

var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 }

var suma = concat(abc, def)

console.log(suma)