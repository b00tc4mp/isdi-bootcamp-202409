var concat = function () {
    var result = { length: 0}
    for (var j = 0; j < arguments.length; j++) {
        var iterableX = arguments[j];
        for (var i = 0; i < iterableX.length; i++) {
            var element = iterableX[i];
            result[result.length] = element;
            result.length++;
        }
    }
    return result;
}




console.log('TEST Array.prototype.concat')
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

console.log('CASE concat 4 iterables of characters')
var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 }
var ghi = { 0: 'g', 1: 'h', 2: 'i', length: 3 }
var jkl = { 0: 'j', 1: 'k', 2: 'l', length: 3 }
var abcdefghijkl = concat(abc, def, ghi, jkl)
console.log(abcdefghijkl)
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h', 8: 'i', 9: 'j', 10: 'k', 11: 'l', length: 12 }