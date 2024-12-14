var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 };
var ghi = { 0: 'g', 1: 'h', 2: 'i', length: 3 };

var abcdef = concat(abc, def)

console.log(abcdef);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]

// V1:

var concat = function (iterable, iterable2) {
    var result = { length: 0 };
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i];
        result[result.length] = element;
        result.length++;
    }
    for (var i = 0; i < iterable2.length; i++) {
        var element = iterable2[i];
        result[result.length] = element;
        result.length++
    }
    return result
}


//V2
var concat = function () {
    var result = { length: 0 }
    for (j = 0; j < arguments.length; j++) {

        for (i = 0; i < arguments[j].length; i++) {
            result[result.length] = arguments[j][i];
            result.length++
        }
    }
    return result;
}

var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 };
var ghi = { 0: 'g', 1: 'h', 2: 'i', length: 3 };

var abcdef = concat(abc, def)

console.log(abcdef);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]