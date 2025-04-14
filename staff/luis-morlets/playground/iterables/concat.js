var concat = function () {

    var result = { length: 0 }

    for (var i = 0; i < arguments.length; i++) {
        var newIterable = arguments[i]

        for (var j = 0; j < newIterable.length; j++) {
            var element = newIterable[j]

            result[result.length] = element
            result.length++
        }
    }
    return result
}

console.log('TEST concat')

console.log('CASE concat 2 iterables')

var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 }

var abcdef = concat(abc, def)
console.log(abcdef);
//{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', lenght: 6 }

console.log('CASE concat 3 iterables of characters')

var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 }
var ghi = { 0: 'g', 1: 'h', 2: 'i', length: 3 }
var abcdefghi = concat(abc, def, ghi)
console.log(abcdefghi)
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h', 8: 'i', length: 9 }