var concat = function (iterable, iterable2) {
    /*
    iterable -> { 0: 'a', 1: 'b', 2: 'c', length: 3 }
    iterable2 -> { 0: 'd', 1: 'e', 2: 'f', length: 3 }

    result -> { length: 0 }

    result -> { 0: 'a', length: 1 }
    result -> { 0: 'a', 1: 'b', length: 2 }
    result -> { 0: 'a', 1: 'b', 2: 'c', length: 3 }

    result -> { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }
    result -> { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }
    result -> { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 }

    return result
    */

    var result = { length: 0 }

    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        result[i] = element
        result.length++
    }

    for (var i = 0; i < iterable2.length; i++) {
        var element = iterable2[i]

        result[result.length] = element
        result.length++
    }

    return result
}

console.log('TEST Array.prototype.concat')

console.log('CASE concat 2 iterables of characters')

var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 }
var abcdef = concat(abc, def)
console.log(abcdef)
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 }