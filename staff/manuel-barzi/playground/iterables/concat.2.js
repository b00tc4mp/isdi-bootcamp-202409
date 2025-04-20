var concat = function (iterable, iterable2) {
    if (arguments.length === 2) {
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

            result[result.length] = element
            result.length++
        }

        for (var i = 0; i < iterable2.length; i++) {
            var element = iterable2[i]

            result[result.length] = element
            result.length++
        }

        return result
    } else {
        /*
        iterable (arguments[0]) -> { 0: 'a', 1: 'b', 2: 'c', length: 3 }
        iterable2 (arguments[1]) -> { 0: 'd', 1: 'e', 2: 'f', length: 3 }
        arguments[2] (iterable3) -> { 0: 'g', 1: 'h', 2: 'i', length: 3 }

        result -> { length: 0 }

        result -> { 0: 'a', length: 1 }
        result -> { 0: 'a', 1: 'b', length: 2 }
        result -> { 0: 'a', 1: 'b', 2: 'c', length: 3 }

        result -> { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }
        result -> { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }
        result -> { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 }

        result -> { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', length: 7 }
        result -> { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h', length: 8 }
        result -> { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h', 8: 'i', length: 9 }

        return result
        */

        var result = { length: 0 }

        for (var i = 0; i < iterable.length; i++) {
            var element = iterable[i]

            result[result.length] = element
            result.length++
        }

        for (var i = 0; i < iterable2.length; i++) {
            var element = iterable2[i]

            result[result.length] = element
            result.length++
        }

        var iterable3 = arguments[2]

        for (var i = 0; i < iterable3.length; i++) {
            var element = iterable3[i]

            result[result.length] = element
            result.length++
        }

        return result
    }
}

console.log('TEST concat')

console.log('CASE concat 2 iterables of characters')

var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 }
var abcdef = concat(abc, def)
console.log(abcdef)
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 }

console.log('CASE concat 3 iterables of characters')

var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 }
var ghi = { 0: 'g', 1: 'h', 2: 'i', length: 3 }
var abcdefghi = concat(abc, def, ghi)
console.log(abcdefghi)
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h', 8: 'i', length: 9 }