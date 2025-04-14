var concat = function (iterable, iterable2) {
    /*
    Iterate on iterable
    */
    var result = { length: 0 }

    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        result[result.length] = element
        result.length++
    } for (var i = 0; i < iterable2.length; i++) {
        var element = iterable2[i]
        result[result.length] = element
        result.length++
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